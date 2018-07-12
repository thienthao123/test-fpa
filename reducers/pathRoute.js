const pathRoute = (state = "",action) =>{
	if(action.type == "PATHROUTE"){
		state = action.pathRoute.pathRoute
	}
	return state
}


export default pathRoute