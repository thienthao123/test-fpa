const _ = require('lodash')
const jwt = require('jsonwebtoken')

const getRoutes = require('../../routes')

const routes = getRoutes()

const publicApi = require('./api')
const webHook = require('./webhook')
const facebook = require('./facebook')

const {findIndexPage} = require('../lib/search')
const { getListMessage ,getCountMessage ,updateMessages} = require('../lib/facebook')
const db = require('../lib/db')
const User = require('../models/user')

const timeSave = 60 * 60 // 1 hour
module.exports = (server,nextApp,handle,io) =>{
	/* routes */
	server.use('/api/v1/public',publicApi)
	server.use('/auth/facebook',facebook)
	/* route index */
	server.get('/:idPage/:url', async (req,res) =>{
    var pathname = "/" + req.params.url
    const idPage = parseInt(req.params.idPage)
    const {query} = req
    const route = routes[pathname]
    //var user = await User.findOne({ 'facebook.id' : req.session.passport.user.facebook.id })
    var user = await User.findOne({ 'facebook.id' : '801980123311861' })
    var index = findIndexPage(user.facebook.pages,idPage)
  	if(route && idPage && index != -1){
      var {facebook} = user
      var page = user.facebook.pages[index]
      var userToken = jwt.sign({ idUser : user.facebook.id,accessTokenPage : page.accessToken,idPage : page.id ,iat : Math.floor(Date.now() / 1000) - timeSave},process.env.secret)
      query.pathRoute = route.page
      query.info = {
        page : {
          id : page.id,
          name : page.name,
          picture : page.picture
        },
        user : {
          name : facebook.name,
          picture : facebook.picture,
          id : facebook.id,
          userToken : userToken
        }
      }
  		nextApp.render(req,res,route.page,query)
      /* add messages to leveldb */
      if(route.page == "/message"){
        updateMessages(page)
      }
  	}else{
  		handle(req,res)
  	}
  })
  /* end index */

  /* webhook */
    server.get('/api/webhook/facebook',(req,res) =>{
        webHook.getRoute(req,res)
    })
    server.post('/api/webhook/facebook',(req,res) =>{
        webHook.postRoute(req,res,io)
    })
  /* end webhook */

}