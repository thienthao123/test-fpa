import React from 'react'
export default class ListPage extends React.Component{
	render(){
		var elm = '<a className="btn btn-success"><i className="fa fa-refresh  fa-spin" /> Call </a>'
		return(
			<div>
			 {elm}
	   		 <a className="btn btn-success"><i className="fa fa-refresh" /> Call </a>
	   		 </div>
			)
	}
}