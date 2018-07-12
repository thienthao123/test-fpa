import React from 'react'

import store from '../store'
import {textMessage} from '../actions'
export default class ChatView extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         messages : props.messages,
         idSender : props.idSender,
         sender : props.sender,
         receiver : props.receiver,
         textMessage : ""
      }
      this.handlerOnChangeMessage = this.handlerOnChangeMessage.bind(this)
      console.log(props)
   }
   handlerOnChangeMessage(e){
      this.setState({textMessage : e.target.value})
   }
   handlerSendMessage = () =>{
      var text = this.state.textMessage
      store.dispatch(textMessage({
         textMessage : text
      }))
      this.props.handlerSendMessage()
      this.setState({textMessage : ""})
   }
   reverseArr(input) {
       var ret = new Array;
       for(var i = input.length-1; i >= 0; i--) {
           ret.push(input[i]);
       }
       return ret;
   }
   render(){
      setTimeout(() =>{
         const chatDiscussion = this.refs.chatDiscussion
         chatDiscussion.scrollTop = chatDiscussion.scrollHeight
      },100)
      var {messages,idSender,sender} = this.state
      var receiver = store.getState().infoProfile.page
      var messagesTmp = this.reverseArr(this.props.messages)
      var elmMessage = messagesTmp.map((message,i) =>{
         var arrayMessageContent = message.message.split('\n')
            var elmMessageContent =  ""
            if(arrayMessageContent.length > 1){
              elmMessageContent = arrayMessageContent.map((message,i) =>{
                  return (<span key={i} className="message-content">
                                       {message}
                                    </span>)
              })
            }else{
               elmMessageContent = (<span className="message-content">
                                       {message.message}
                                    </span>)
            }
         if(message.id == idSender){
               return (
                  <div key={i} className="chat-message left">
                                 <img className="message-avatar" src={sender.picture}  />
                                 <div className="message">
                                    <a className="message-author" href="#"> {sender.name} </a>
                                    <span className="message-date"> {message.date} </span>
                                    {elmMessageContent}
                                 </div>
                              </div>)
         }else{
            return (
                  <div key={i} className="chat-message right">
                                 <img className="message-avatar" src={receiver.picture}  />
                                 <div className="message">
                                    <a className="message-author" href="#"> {receiver.name} </a>
                                    <span className="message-date"> {message.date} </span>
                                    {elmMessageContent}
                                 </div>
                              </div>)
         }
      })
      return(
         <div className="ibox chat-view">
                  <div className="ibox-title">
                     <h5>{sender.name}</h5>
                     <div className="ibox-tools">
                       
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-wrench"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                           <li><a href="#">turn off notifi</a></li>
                           <li><a href="#">Block user</a></li>
                           <li><a href="#"><i className="fa fa-check"></i> Hide cmt</a>
                           </li>
                        </ul>
                        <a className="close-link" onClick={this.props.handlerClose}>
                            <i className="fa fa-times"></i>
                        </a>
                     </div>
                  </div>
                  <div className="ibox-content">
                     <div className="row">
                        <div className="col-md-12 ">
                           <div className="chat-discussion"  ref="chatDiscussion">
                              {elmMessage}
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-lg-12">
                           <form role="form">
                              <div className="form-group">
                                 <textarea id="message" className="form-control" placeholder="Message" onChange={this.handlerOnChangeMessage} value={this.state.textMessage}></textarea>
                              </div>
                              <div className="text-right">
                                 <button onClick={this.handlerSendMessage} type="button" className="btn btn-sm btn-primary m-t-n-xs"><strong>Send message</strong></button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
               )
      }
}