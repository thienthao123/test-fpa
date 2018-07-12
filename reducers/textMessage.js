const textMessage = (state = "",action) =>{
	if(action.type == "TEXTMESSAGE"){
		state = action.text.textMessage
	}
	return state
}


export default textMessage