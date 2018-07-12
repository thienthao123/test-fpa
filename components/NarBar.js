import MenuLink from './MenuLink'
import store from '../store'
export default (props) =>
<nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
         <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
               <div className="dropdown profile-element">
                  <span>
                  <img alt="image" className="img-circle img-md" src={props.infoProfile.user.picture} />
                  </span>
                  <span>
                  <img alt="image" className="img-circle" src={props.infoProfile.page.picture} />
                  </span>
                  <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{props.infoProfile.user.name}</strong>
                  </span> <span className="text-muted text-xs block">Art Director <b className="caret"></b></span> </span> </a>
                  <ul className="dropdown-menu animated fadeInRight m-t-xs">
                     <li><a href="profile.html">Profile</a></li>
                     <li><a href="contacts.html">Contacts</a></li>
                     <li><a href="mailbox.html">Mailbox</a></li>
                     <li className="divider"></li>
                     <li><a href="login.html">Logout</a></li>
                  </ul>
               </div>
               <div className="logo-element">
                  IN+
               </div>
            </li>
            <MenuLink 
                label="Dashboard"
                to="/dashboard"
                icon="fa fa-th-large"
             />
             <MenuLink 
                label="Chat"
                to="/message"
                icon="fa fa-envelope"
             />
             <MenuLink 
                label="Comment"
                to="/comment"
                icon="fa fa-comments"
             />
             <MenuLink 
                label="Pages"
                to="/pages"
                icon="fa fa-group"
             />
             <MenuLink 
                label="Settings"
                to="/settings"
                icon="fa fa-ban"
             />
         </ul>
      </div>
   </nav>