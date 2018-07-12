import React from 'react'
import socketIOClient from 'socket.io-client'
import {NotificationManager} from 'react-notifications';

import Layout from '../components/Layout'
import ChatView from '../components/ChatView'
import UserList from '../components/UserList'


import store from '../store'
import { userMessage } from '../actions'
var userMessageRedux = userMessage
export default class message extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      messages : [],
      userMessage : {},
      idSender : 0,
      idReceiver : 0,
      elmChat : "",
      textMessage : "",
      message_count : 0,
      isRandomLopMessage : 0,
      infoProfile : {}
    }
    var infoProfile = this.props.url.query.info
    var {page,user} = infoProfile
    this.socket = socketIOClient("http://localhost:3000")
    this.socket.on('connect',()=>{
      this.socket.emit('authorized',{
        token : infoProfile.user.userToken,
        idPage : infoProfile.page.id,
        idUser : infoProfile.user.id
      })
    })
    this.socket.on('updateId-s',(id) => {
      this.socket.emit('updateId-c',{
        id,
        idPage : page.id,
        idUser : user.id
      })
    })
    this.socket.on('getListMessage-s',(messages) =>{
      if(messages.length){
        this.setState({messages})
      }
    })
    this.socket.emit('getListMessage-c',1)
  }
  componentWillMount(){
    var infoProfile = this.props.url.query.info
    this.setState({infoProfile})
  }
  _ViewChat = async () =>{
       var { userMessage } = store.getState()
       var elmChat = await this.addViewChat(userMessage)
       this.setState({elmChat})
   }

  addViewChat(userMessage){
    return new Promise((resolve,reject) =>{
    if(userMessage.sender.id != this.state.idSender){
            if(this.state.elmChat){
                this.setState({elmChat : ""})
            }
            setTimeout(() =>{
                if(!this.state.elmChat){
                  var elmChat = (<ChatView
                            sender={userMessage.sender}
                            idSender={userMessage.sender.id}
                            receiver={userMessage.receiver}
                            messages={userMessage.messages}
                            textMessage={this.state.textMessage}
                            handlerClose={this.handlerClose}
                            handlerSendMessage={this.handlerSendMessage}
                      />)
                  this.setState({
                    userMessage,
                    idSender : userMessage.sender.id,
                    idReceiver : userMessage.receiver.id,
                    elmChat,
                    message_count : userMessage.message_count
                  })
                  resolve(elmChat)
                }
             },100)
          }
          })
   }

   handlerClose = () =>{
      if(this.state.elmChat){
                this.setState({elmChat : "",idSender :0})
        }
   }

   handlerSendMessage = () =>{
    var {textMessage} = store.getState()
    var { idSender,infoProfile } = this.state
    console.log(this.state)
      this.socket.emit('sendMessage-c',{
        idReceiver : idSender,
        textMessage,
        idPage : infoProfile.page.id
      })
   }


  render(){
        console.log(this.state)

    var {infoProfile} = this.state
    this.socket.on('sendMessage-s', (message) =>{
       var userMessage = store.getState().userMessage
       var messages = [message,...userMessage.messages]
       if(this.state.isRandomLopMessage != message.random ){ // check loop socket on sv
        this.setState({isRandomLopMessage : message.random})
          userMessage.messages = messages
           store.dispatch(userMessageRedux({
                user : userMessage
           }))
           var elmChat = (<ChatView
                            sender={userMessage.sender}
                            idSender={userMessage.sender.id}
                            receiver={userMessage.receiver}
                            messages={userMessage.messages}
                            textMessage={this.state.textMessage}
                            handlerClose={this.handlerClose}
                            handlerSendMessage={this.handlerSendMessage}
                      />)
           this.setState({elmChat})
       }
    })
    var { messages,userMessage } = this.state
    var elmUserList = messages.map((user,i) =>{
      return <UserList ViewChat={this._ViewChat} key={i} user={user} />
    })
    if(this.state.idSender){
        var {userMessage} = store.getState() 
        var { elmChat } = this.state
    }
    return(
            <Layout query={this.props.url.query}>
  
               <div className="row">
                  <div className="col-lg-9">
                  {elmChat}
                  </div>
                  <div className="col-lg-3">
                     <div className="ibox">
                        <div className="chat-users">
                           <div className="ibox-content">
                              <div className="users-list">
                                 <label>User Lits</label>
                                  {elmUserList}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Layout>
      )
  }
}
