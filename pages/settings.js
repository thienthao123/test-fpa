import Layout from '../components/Layout'
export default (props) =>
<Layout query={props.url.query}>
	<div className="row">
               <div className="col-lg-12">
                  <div class="ibox float-e-margins">
                     <div class="ibox-title">
                        <h5>Custom switch</h5>
                        <div class="ibox-tools">
                           <a class="collapse-link">
                           <i class="fa fa-chevron-up"></i>
                           </a>
                           <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                           <i class="fa fa-wrench"></i>
                           </a>
                           <ul class="dropdown-menu dropdown-user">
                              <li><a href="#">Config option 1</a>
                              </li>
                              <li><a href="#">Config option 2</a>
                              </li>
                           </ul>
                           <a class="close-link">
                           <i class="fa fa-times"></i>
                           </a>
                        </div>
                     </div>
                     <div class="ibox-content">
                        <div class="switch">
                           <label>An tat ca cmt</label>
                           <div class="onoffswitch">
                              <input type="checkbox" disabled="" class="onoffswitch-checkbox" id="example4" />
                              <label class="onoffswitch-label" for="example4">
                              <span class="onoffswitch-inner"></span>
                              <span class="onoffswitch-switch"></span>
                              </label>
                           </div>
                        </div>
                        <div class="switch">
                           <label>An comment co so dien thoai</label>
                           <div class="onoffswitch">
                              <input type="checkbox" disabled="" class="onoffswitch-checkbox" id="example4" />
                              <label class="onoffswitch-label" for="example4">
                              <span class="onoffswitch-inner"></span>
                              <span class="onoffswitch-switch"></span>
                              </label>
                           </div>
                        </div>
                        <div class="switch">
                           <label>Tra loi nhanh</label>
                           <div class="onoffswitch">
                              <input type="checkbox" disabled="" class="onoffswitch-checkbox" id="example4" />
                              <label class="onoffswitch-label" for="example4">
                              <span class="onoffswitch-inner"></span>
                              <span class="onoffswitch-switch"></span>
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
</Layout>