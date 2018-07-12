const jwt = require('jsonwebtoken')
require('dotenv').config()

var checkAuthToken = (token) =>{
      return jwt.verify(token,process.env.secret)
}

module.exports = {
	checkAuthToken
}