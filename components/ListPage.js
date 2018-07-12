import React from 'react'
import axios from 'axios'
import store from '../store'
export default class ListPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isClickConnect : false,
      page : {}
    }
  }
  componentWillMount(){
    this.setState({page : this.props.page})
  }
  _ConnectPage = () =>{
    this.setState({
      isClickConnect : true
    })
    var { page } = this.state
    if(!page.isConnect){
      var idUser = store.getState().infoProfile.user.id
      axios.post(`/api/v1/public/pages/${idUser}/connect`,{
        page : page,
        index : this.props.index
      })
      .then((data) => data)
      .then(message =>{
          this.setState({
            isClickConnect : false
          })
          this.setState({
            page : {
              isConnect : true
            }
          })
      })
    }
  }
  _DisConnectPage = () =>{
    var { page } = this.state
    axios.post(`/api/v1/public/pages/${page.id}/disconnect`,{
      page : page
    })
    .then((data) => data)
    .then(page =>{
        this.setState({page})
    })
  }
  render(){
    var { page } = this.state
    var classIcon = ""
    var label = "Connect"
    if(!page.isConnect){
        classIcon = this.state.isClickConnect ? "fa fa-refresh fa-spin" : "fa fa-refresh"
    }else{
      label = "Connected"
      classIcon = "fa fa-check"
      var btnDisConnect = <a onClick={this._DisConnectPage} className="btn btn-danger"><i className="fa fa-trash" /> DisConnect </a>
    }
    return(
      <div className="col-lg-4">
        <div className="contact-box center-version">
          <a href={"/" + this.props.page.id + "/dashboard"}>
            <img alt="image" className="img-circle" src={this.props.page.picture} />
            <h3 className="m-b-xs"><strong>{this.props.page.name}</strong></h3>
          </a>
          <div className="text-center" style={{paddingBottom : '10px'}}>
              <a onClick={this._ConnectPage} className="btn btn-success"><i className={classIcon} /> {label} </a>
              {btnDisConnect}
          </div>
        </div>
      </div>
      )
  }
}