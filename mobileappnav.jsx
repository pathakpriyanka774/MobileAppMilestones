import React, { Component } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
class MobileappNav extends Component {
    state={
        brandarr:["Samsung", "Xiaomi", "Realme", "Apple"],
        ramarr:["3GB", "4GB", "6GB", "8GB"],
        romarr:["32GB", "64GB", "128GB", "256GB"],
        osarr:["Android", "iOS"],
    }
    render() {
        const {brandarr,ramarr,romarr,osarr}=this.state;
        return ( <nav className = "navbar navbar-expand-sm navbar-dark bg-dark" >
            <Link className = "navbar-brand  ms-2" to = "/mobileappcontent" >Mobiles</Link>
             <div className = "" >
                <ul className = "navbar-nav mr-auto" >
            <li className = "nav-item" >
            <Dropdown as={NavItem}>
  <Dropdown.Toggle as={NavLink}>Brands</Dropdown.Toggle>
  <Dropdown.Menu>
  {
               brandarr.map((n1)=>(
    <Dropdown.Item><Link to={`/mobilecontent/brand/${n1}`}>{n1}</Link></Dropdown.Item>
    ))
} 
  </Dropdown.Menu>
</Dropdown>
 
            </li>
            <li className = "nav-item" >
            <Dropdown as={NavItem}>
  <Dropdown.Toggle as={NavLink}>RAM</Dropdown.Toggle>
  <Dropdown.Menu>
  {
               ramarr.map((n1)=>(
    <Dropdown.Item><Link to={`/mobilecontent/RAM/${n1}`}>{n1}</Link></Dropdown.Item>
    ))
} 
  </Dropdown.Menu>
</Dropdown>
            </li>
            <li className = "nav-item" >
            <Dropdown as={NavItem}>
  <Dropdown.Toggle as={NavLink}>ROM</Dropdown.Toggle>
  <Dropdown.Menu>
  {
               romarr.map((n1)=>(
    <Dropdown.Item><Link to={`/mobilecontent/ROM/${n1}`}>{n1}</Link></Dropdown.Item>
    ))
} 
  </Dropdown.Menu>
</Dropdown>
            </li>
            <li className = "nav-item" >
            <Dropdown as={NavItem}>
  <Dropdown.Toggle as={NavLink}>OS</Dropdown.Toggle>
  <Dropdown.Menu>
  {
               osarr.map((n1)=>(
    <Dropdown.Item><Link to={`/mobilecontent/OS/${n1}`}>{n1}</Link></Dropdown.Item>
    ))
} 
  </Dropdown.Menu>
</Dropdown>
            </li> 
             <li className = "nav-item" >
            <Link className = "nav-link" to ={"/mobilenewform"}>New Mobile </Link>
             </li> 
             </ul> 
              </div>
               </nav>
               
        )
    }

}
export default MobileappNav;