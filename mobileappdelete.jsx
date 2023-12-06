import React,{Component} from "react";
import http from "./httpservice";
class MobileappDelete extends Component{
    async componentDidMount(){
        const {name}=this.props.match.params;
        console.log(name);
        let response= await http.deleteApi(`/svrr/mobile/delete/${name}`);
        this.props.history.push(`/mobilecontent`);
    };
    render(){
        
        return(
            <div className="container">

            </div>
        )
    }

}
export default MobileappDelete;