const express = require('express')
const _ = require('lodash')
const User = require('../models/user')
const { getPages ,getListMessage ,sendMessage} = require('../lib/facebook')
const { searchPage,findIndexPage } = require('../lib/search')
const db = require('../lib/db')
const app = express.Router()

var accessTokenTestPage = "EAAAAUaZA8jlABAMrh8G8Si1zbZCrFtYEqa320nZCj0qgZAdFrrsxOi6P9HZA9TkZBC1xtTVTEAZBDyotjwnm8FBgcWX85M8oRNDQ4pZBVGXFN8T2RUcA8lWanXgxwmA4ey7CIxoHpB97uEBGWCoLa8KTM451ZClivSM7q1sjM2fCRPLYLzeSflvFv"


app.get('/pages', async (req,res) =>{
		//var user = req.session.passport.user
		//var pages = [{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/30261950_430712074039452_4912806046700929024_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=7a5f7bbac2293c04a0bbef753151e3fe&oe=5BE388CB","name":"KINGA HAI","id":"430712014039458"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/399548_10149999285987789_1102888142_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=2ef885c8654d8106e0dd9eca249ebf4d&oe=5BD5DB6A","name":"हैलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलोलो","id":"143980042982450"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/26731462_166248517475545_3264946271066436811_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=df164631a99dc49875320d10bbec1395&oe=5BA13C52","name":"HAI KING ME","id":"166248460808884"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/26169825_128375071296293_5421737232359293041_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=627299690e68802064a09b68e5ebf655&oe=5BDEFF6F","name":"TÌm phim hay","id":"128373771296423"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/26169593_1230274760407430_6817823023427251460_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=e35ef86df474544f557c6b2450465767&oe=5BDAA4F8","name":"Phim Ca nhạc Pỏn","id":"1230274243740815"},{"picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/24899874_357033394768036_64417270714935839_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=3305e20674cf887e8042b93cf1f32f19&oe=5BA230D3","name":"J0zqwel","id":"357033208101388"}]
		var user =  await User.findOne({'facebook.id' : "801980123311861"})
		var { pages } = user.facebook
		if(user.local.pages.length){
			var localPages = user.local.pages
			for(let i = 0, length1 = localPages.length; i < length1; i++){
				 searchPage(pages,localPages[i].id)
			}
		}
		res.json(pages)
})

app.post('/pages/:id/connect',(req,res) =>{
	var id = req.params.id //id user
	var idPage = req.body.page.id
	User.findOne({'facebook.id' : id})
	.then(user =>{
		var newPages = user.local.pages
		var index = findIndexPage(user.facebook.pages,idPage)
		var page = user.facebook.pages[index]
		var indexPageLocal = findIndexPage(user.local.pages,idPage)
		if(indexPageLocal == -1){
			page.isConnect = true
			newPages = [page,...newPages]
		}
		user.local.pages = newPages
		user.save((err) =>{
			if(err) res.json(err)
			page.isConnect = true
			res.json({
				message : "connected",
				page,
			})
		})
	})
})

app.post('/pages/:id/disconnect',(req,res) =>{
	var id = req.params.id
	var _id = "5b41ff3de0b86231d8b30dae"
	User.findOne({'facebook.id' : "1044396102403594"})
	.then(user =>{
		var {page} = req.body
		var localPages = user.local.pages
		var newPages = []
		var index = _.findIndex(localPages,(item) =>{
			if(item.id == page.id){
				return item
			}
		})
		localPages.splice(index,1)

		for(let i = 0, length1 = localPages.length; i < length1; i++){ // remove null
			if(localPages[i].id){
				newPages.push(localPages[i])
			}
		}
		user.local.pages = newPages
		user.save((err) =>{
			if(err) res.json(err)
			res.json({
				message : "Disconnected",
				page,
			})
		})
	})
})


app.get('/test', async (req,res) =>{
	var messages = await getListMessage("me",accessTokenTestPage)
	res.json(messages)
})
app.get('/page/test',(req,res) =>{
	var id = req.query.id
	db.get(`messages_${id}`,(err,value) =>{
		console.log(value)
		res.json(JSON.parse(value))
	})
})
module.exports = app