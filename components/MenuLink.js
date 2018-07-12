import React from 'react'

import store from '../store'

export default class MenuLink extends React.Component{
	render(){
		var {pathRoute} = store.getState()
		var {page} =  store.getState().infoProfile
		var isActive = false
		if(pathRoute){
			if(pathRoute == this.props.to){
				isActive = true
			}
		}
		return(
			<li className={isActive ? "special_link active" : "link"} > 
	               <a href={"/" + page.id  + this.props.to}><i className={this.props.icon}></i> <span className="nav-label">{this.props.label}</span></a>
			</li>
			)
	}
}
// export default (props) =>
