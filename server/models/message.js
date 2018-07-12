const mongoose = require('mongoose')

const Schema =  mongoose.Schema


var SchemaMessage = new Schema({
	messages : [],
	idPage : String
},{
	timestamps : true
})


module.exports = mongoose.model('Mesasages',SchemaMessage)