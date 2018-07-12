require('dotenv').config()
const next = require('next')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const _ = require('lodash')
const queryString = require('query-string');
const app = require('express')()
const session = require("express-session")({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true
  })
const sharedsession = require("express-socket.io-session");


const socketIORoute = require('./socket')
const logger = require('./logs')
const routesServer = require('./routes')
const { checkAuthToken } = require('./lib/auth')


const dev = process.env.NODE_ENV != 'production'

const nextApp = next({ dev })


const handle = nextApp.getRequestHandler()



const port = process.env.PORT || 3000
const ROOT_URL = dev ? `http://localhost:${port}` : 'https://builderbook.org';

mongoose.connect('mongodb://localhost:27017/fanpage',{useNewUrlParser : true})

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = require('http').Server(app)

const io = socketIO(server)

io.use(sharedsession(session,{autoSave:true}));

io.on('connection',socketIORoute)

nextApp.prepare().then(() => {

  app.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  app.get('/static/*', (req, res) => {
    handle(req, res);
  });

  routesServer(app,nextApp,handle,io)

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });

})

