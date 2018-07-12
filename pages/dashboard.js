import React from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import ListPage from '../components/ListPage'

const api = "http://localhost:3000/api/v1"
/*
    Tạo app
     - Config
        + id app
        + tên app
     - if id app != config id app && ten app != config ten app 
*/

export default class index extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pages : []
    }
  }
  componentWillMount(){
    axios.get(`${api}/public/pages`)
    .then((data) => data.data)
    .then(pages =>{
      this.setState({
        pages
      })
    })
  }

  render(){
    var ListPageElm = this.state.pages.map((page,i) =>{
        return <ListPage key={i} page={page} index={i} />
    })
    return(
          <Layout query={this.props.url.query}>
               <div className="row">
                     {ListPageElm}
            </div>
      </Layout>
      )
  }
}