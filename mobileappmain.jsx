import React,{Component} from "react";
import { Route,Switch,Redirect } from "react-router-dom";
import MobileappCont from "./mobilecontent";
import MobileappForm from "./mobilenewform";
import MobileappNav from "./mobileappnav";
import Mobileappleftpannel from "./mobileappleftpannel";
import MobileappDelete from "./mobileappdelete";
class MobileappMain extends Component{
    render(){
        return(
        <React.Fragment><div className="container">
            <MobileappNav/>
            <Switch>
           
            <Route path="/mobilecontent/brand/:brand" render={(props)=><MobileappCont {...props}   />} />
            <Route path="/mobilecontent/RAM/:RAM" render={(props)=><MobileappCont {...props}   />} />
            <Route path="/mobilecontent/ROM/:ROM" render={(props)=><MobileappCont {...props}   />} />
            <Route path="/mobilecontent/OS/:OS" render={(props)=><MobileappCont {...props}   />} />  
            <Route path="/mobilecontent" render={(props)=><MobileappCont {...props}   />} /> 
            <Route path="/mobilenewform/:name/edit" render={(props)=><MobileappForm {...props}   />} /> 
            <Route path="/mobileappdelete/:name/delete" render={(props)=><MobileappDelete {...props}   />} />  
            
                    <Route path="/mobilenewform" render={(props)=><MobileappForm {...props}   />} /> 
                   
                    <Redirect from="/" to="/mobilecontent"/>

                </Switch>
                </div>
                    </React.Fragment>)
    }

}
export default MobileappMain;