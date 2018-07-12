var request = require('request');
var rp = require('request-promise');

var moment = require('moment')

var db = require('./db')

var idMessageDb = require('../models/idMessage')

var Mesasages = require('../models/message')

let api = "https://graph.facebook.com/v2.12"

moment.locale('vi')

var getInfoUser = (id,access_token) =>{
	return new Promise((resolve,reject) =>{
		request.get(`${api}/${id}?fields=picture,name&access_token=${access_token}`,(err,res,body) =>{
			body = JSON.parse(body)
			resolve({
				picture : body.picture.data.url,
				name : body.name,
				id : body.id
			})
		})
	})
}
var getInfoUserMessage = (id,access_token) =>{
	return new Promise((resolve,reject) =>{
		request.get(`${api}/${id}?access_token=${access_token}`,(err,res,body) =>{
			body = JSON.parse(body)
			resolve({
				picture : body.picture.data.url,
				name : body.name,
				id : body.id
			})
		})
	})
}

var getListMessage = async (id, access_token,limit = 1000,limitSender = 100) => {
	try{
    	var body = await doRequest(`${api}/${id}/conversations?fields=name,message_count,senders,id,link,updated_time,can_reply,messages.limit(${limit})&limit=${limitSender}&access_token=${access_token}`)
    	if(!body){
    		return -1
    	}
    }catch(e){
    	if(e){
    		console.log(e)
    		return e
    	}
    }
    try{
	    const {
	        data
	    } = JSON.parse(body)
    }catch(e){
    	if(e){
    		return -1
    	}
    }
    var result = []
    for (let i = 0, length1 = data.length; i < length1; i++) {
    	try{
	        var user = await getInfoUser(data[i].senders.data[0].id, access_token)
	        var messageEncode = data[i].messages.data
	        var messages = []
	        for(let i = 0, length1 = messageEncode.length; i < length1; i++){
	        	var message = await getMessage(messageEncode[i].id,access_token)
	        	messages.push(message)
	        }
	        sender = data[i].senders.data[0]
	        sender.picture = user.picture
	        result.push({
	            message_count: data[i].message_count,
	            sender: sender,
	            receiver: data[i].senders.data[1],
	            date: dateString(data[i].updated_time),
	            messages : messages
	        })
        }catch(e){
        	console.log(e)
        	return "co loi"
        }
    }
    return result
}

var getMessage =  async (id,access_token) =>{
	try{
		var body = await doRequest(`${api}/${id}?fields=from,created_time,id,message&access_token=${access_token}`)
		body = JSON.parse(body)
		var message = {
			id : body.from.id,
			message : body.message,
			date : dateString(body.created_time)
		}
		return message
	}catch(e){
		console.log(e)
	}
}

var getCountMessage = async (id,access_token) =>{
	try{
    	var body = await doRequest(`${api}/${id}/conversations?fields=name,message_count,senders,id,link,updated_time,can_reply&access_token=${access_token}`)
    	if(!body){
    		return 'error'
    	}
    }catch(e){
    	if(e){
    		console.log(e)
    		return e
    	}
    }
    try{
	    const {
	        data
	    } = JSON.parse(body)
    }catch(e){
    	if(e){
    		console.log(body)
    		return e
    	}
    	console.log(e)
    }
    var result = []
    for (let i = 0, length1 = data.length; i < length1; i++) {
    	try{
	        result.push({
	            message_count: data[i].message_count
	        })
        }catch(e){
        	console.log(e)
        	return "co loi"
        }
    }
    return result
}

var getPages = async (access_token) =>{
	try {
		var body = await doRequest(`${api}/me/accounts?fields=picture,name,access_token&access_token=${access_token}`)
		var { data } = JSON.parse(body)
		var pages = []
		for(let i = 0, length1 = data.length; i < length1; i++){
			pages.push({
				picture : data[i].picture.data.url,
				name : data[i].name,
				id : data[i].id,
				accessToken : data[i].access_token
			})
		}
		return pages
	} catch(e) {
		console.log(e);
	}
}

var sendMessage = async (senderId,message,access_token) => {
  var body =  await rp({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: access_token,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  })
  return body.message_id ? 1 : -1
}

var hideComment = (idComment,accessToken,status = true) =>{
  return new Promise((resolve,reject) =>{
    request.post(`${api}/${idComment}?is_hidden=${status}&access_token=${accessToken}`,(err,res,body) =>{
      if(res.status == 200){
          return true
      }else{
        reject({error : "update access_token"})
      }
    })
  })
}

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

var dateString = (iso8601) => {
	try{
		return moment(iso8601).format("dddd,DD-MM-YYYY h:mm:ss")
	}catch(e){
		var timestamp = iso8601
		return moment(timestamp).format('LLLL')
	}
}

var updateMessages = async (page) => {
	/*
	so sánh 2 count

	sau đó trừ nhau 

	ra limit message > get Mesasages về push vào array
	*/
	var idPage = page.id
	var messageCout = await getCountMessage(idPage,page.accessToken)
	var MesasagesDb = await Mesasages.findOne({ idPage : idPage })
          if(MesasagesDb){
            var json = MesasagesDb.messages
            if(json.length == messageCout.length){
              for(let i = 0, length1 = json.length; i < length1; i++){
              	var countMessage = json[i].messages.length
                if(countMessage != messageCout[i].message_count){
                  var messagesPush = []
                  var deviation = messageCout[i].message_count - countMessage
                  var messages = await getListMessage(idPage,page.accessToken,deviation,1) // id,access,limit,limit sender
                  if(!messages){
                  	return -1
                  }
                  for(let j = 0, length1 = messages[0].messages.length; j < length1; j++){
                  		
                  		messagesPush = [messages[0].messages[j],...json[i].messages]
                  }
                  json[i].messages = messagesPush
                  json[i].message_count = json[i].messages.length
                  console.log(JSON.stringify(json))
                  Mesasages.findOneAndUpdate({ idPage : MesasagesDb.idPage },{ $set  : { messages : json } },(err) =>{
                  	console.log(err)
                  })
            	  return 0
                }
              }
            }else{
              	var messages = await getListMessage(idPage,page.accessToken)
              	if(!messages){
                  	return -1
                  }
              	MesasagesDb.messages = messages
            	MesasagesDb.save()
            }
          }else{
          	try{
            	var messages = await getListMessage(idPage,page.accessToken)
            	if(!messages){
                  	return -1
                  }
            	var newMessageDb = new Mesasages({
            		idPage : idPage,
            		messages : messages
            	})
            	newMessageDb.save()
        	}catch(e){
        		console.log(e)
        	}
          }
}

var saveIdMessage = async (page,idMessage) => {
		var data  = await idMessageDb.findOne({idPage : page.id,idMessage : idMessage})
		if(data){
			return data
		}else {
			var message = await getListMessage(page.id, page.accessToken, 1,1)
			var idUser = message[0].sender.id
			var db = new idMessageDb({
				idPage : page.id,
				idUser : idUser,
				idMessage : idMessage
			})
			db.save()
			return db
		}
		
				
}
module.exports = {
	dateString,
	doRequest,
	getMessage,
	getListMessage,
	getInfoUser,
	getPages,
	sendMessage,
	getCountMessage,
	updateMessages,
	saveIdMessage,
  hideComment
}