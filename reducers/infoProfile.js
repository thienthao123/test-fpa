var infoPage = (state = {},action) =>{
	if(action.type == "INFOPROFILE"){
		state = action.infoProfile
	}
	return state
}

export default infoPage