var { dateString,saveIdMessage,updateMessages ,hideComment } = require('../lib/facebook')
var { findIndexPage } = require('../lib/search')

var User = require('../models/user')
var db = require('../lib/db')
var getRoute = (req,res) =>{
	let token = process.env.TOKEN_WEBHOOK
	let challenge = req.query['hub.challenge']
	if(req.query['hub.verify_token'] == token){
		res.send(challenge)
	}else{
		res.status(403).send()
	}
} 

var postRoute = async (req,res,io) =>{
	var data = req.body
	if(data.object == "page"){ // webhook page
		var entry = data.entry[0]
			var idPage = entry.id
			if('messaging' in entry){
				var textMessage = entry.messaging[0].message.text
				var idSender = entry.messaging[0].sender.id // == idMessage
				var time = dateString(entry.messaging[0].timestamp)
				var user = await User.findOne({'local.pages.id' : idPage})
				if(user){
					var index = findIndexPage(user.local.pages,idPage)
					var page = user.local.pages[index]
					var dataIdMessage = await saveIdMessage(page,idSender)
					var {idUser} = dataIdMessage 
					var messageSocket = {
							id : idUser,
							date : time,
							message : textMessage,
							random : Math.floor(Math.random() * 99999999) + 1
						}
					db.get(`socket_${page.id}`,(err,socketId) =>{
						io.sockets.to(socketId).emit('sendMessage-s',messageSocket)
					})
					if(updateMessages(page) == -1){
						console.log('update access_token')
					}
					res.json('ok')
				}
				
			}
			if('changes' in entry){
				var changes = entry.changes[0]
				if(changes.value.item == "comment"){
					var value = changes.value
					var { comment_id,post_id,sender_id,sender_name,created_time,message } = value
					var info = {
						 comment_id,
						 post_id,
						 sender_id,
						 sender : {
						 	id : sender_id,
						 	name : sender_name
						 },
						 message,
						 date : dateString(new Date()),
						 random : Math.floor(Math.random() * 99999999) + 1
					}
					try {
						var test = await hideComment(comment_id,'')
					} catch(e) {
						// statements
						console.log(e);
					}
					console.log(test)
					console.log(info)
					res.json('ok')
				}
			}
	}
}
module.exports = {
	getRoute,
	postRoute
}