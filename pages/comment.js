import Layout from '../components/Layout'
import ChatView from '../components/ChatView'
/*
    Tạo app
     - Config
        + id app
        + tên app
     - if id app != config id app && ten app != config ten app 
*/
export default (props) =>
<Layout query={props.url.query}>
         <div className="row">
            <div className="col-lg-9">
               <ChatView
                  username="thienthao123"
               />
            </div>
            <div className="col-lg-3">
               
            </div>
         </div>
</Layout>