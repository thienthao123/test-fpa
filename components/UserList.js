import React from 'react'
import store from '../store'
import { userMessage } from '../actions'
export default class UserList extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         user : props.user
      }
   }
   onClick = () =>{
      store.dispatch(userMessage({
         user : this.props.user
      }))
      this.props.ViewChat()
      console.log(store.getState())
   }
   render(){
      return(
      <div className="chat-user" onClick={this.onClick}>
         <img className="chat-avatar" src={this.props.user.sender.picture} />
         <div className="chat-user-name">
            <a href="#">{this.props.user.sender.name}</a>
         </div>
      </div>
      )
   }
}