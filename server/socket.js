const jwt = require('jsonwebtoken')
const { getInfoUser ,getListMessage ,getMessage ,doRequest ,sendMessage ,dateString, updateMessages} = require('./lib/facebook')
const { checkAuthToken } = require('./lib/auth')
const { findIndexPage } = require('./lib/search')

const User = require('./models/user')
const idMessageDb = require('./models/idMessage')
const Messages = require('./models/message')
const db = require('./lib/db')




/*
	 c : client
	 s : server

*/


module.exports = (socket) =>{
		socket.auth = false
		socket.info = {
			idPage : 0,
			idUser : 0,
			accessTokenPage : ""
		}
		socket.on('authorized',(data) =>{
			var isUser = checkAuthToken(data.token)
			if(isUser){
				socket.auth = true
				socket.info.idPage = data.idPage
				socket.info.idUser = data.idUser
				socket.info.accessTokenPage = data.accessTokenPage
				console.log('authorized ',socket.id)
			}
		})

		setTimeout(() =>{
			if(!socket.auth){
				console.log('disconnecting socket ',socket.id)
				socket.disconnect('unauthorized')
			}
		},1000)

		socket.on('getListMessage-c', async (data) =>{
			var { idUser,idPage } = socket.info
				var user = await User.findOne({'facebook.id' : idUser})
				var index = findIndexPage(user.local.pages,idPage)
				if(index && idPage){
					var data = await Messages.findOne({ idPage : idPage })
					if(data) {
						socket.emit('getListMessage-s',data.messages)
					}
				}
		})
		socket.on('sendMessage-c', async (data) =>{
			var { idReceiver,textMessage,idPage } = data
			var {accessTokenPage} = socket.info 
			var dataIdMessage = await idMessageDb.findOne({idUser : idReceiver,idPage})
			if(!dataIdMessage){
				console.log('loz')
			}
				var send = await sendMessage(dataIdMessage.idMessage,textMessage,'')
				var message = {
					id : idPage,
					date : dateString(new Date()),
					message : textMessage,
					random : Math.floor(Math.random() * 99999999) + 1
				}
				if(send == 1 ){
					socket.emit('sendMessage-s',message)
					var page = {
						id : idPage,
						accessToken : accessTokenPage
					}
					updateMessages(page)
				}
		})
		socket.emit('updateId-s',socket.id)
		socket.on('updateId-c',(data) =>{
			db.put(`socket_${data.idPage}`,data.id)
		})
}

