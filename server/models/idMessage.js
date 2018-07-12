const mongoose = require('mongoose')

const Schema =  mongoose.Schema


var SchemaIdMessage = new Schema({
	idUser : { type : String },
	idMessage : { type : String },
	idUserApp : { type : String },
	idPage : { type : String }
},{
	timestamps : true
})


module.exports = mongoose.model('idMessage',SchemaIdMessage)