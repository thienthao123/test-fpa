import _ from 'lodash'
const userMessage = (state = [],action) =>{
	if(action.type == "USERMESSAGE"){
		var user = action.user.user
		state = user
	}
	return state
}

export default userMessage