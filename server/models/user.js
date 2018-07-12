const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema =  mongoose.Schema

const SALT_WORK_FACTION = 10

var UserSchema = new Schema({
	
	local : {

		username : { type : String},
		password : { type : String },
		pages : { type : Array}

	},
	facebook : {
		id : { type : String,required : true },
		email : { type : String },
		picture : { type : String },
		accessToken : { type : String, required: true },
		name : { type : String,required : true },
		pages : { type : Array }
	}
},{
	timestamps : true
})


// UserSchema.pre('save',function(next){
// 	var user = this
// 	bcrypt.genSalt(SALT_WORK_FACTION,function(err,salt){
// 		if(err) return next(err)
// 		bcrypt.hash(user.password,salt,function(err,hash){
// 			if(err) return next(err)
// 			user.password = hash
// 			next()
// 		})
// 	})
// })

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(SALT_WORK_FACTION),null)
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.local.password)
}

module.exports = mongoose.model('User',UserSchema)