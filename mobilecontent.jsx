import React, { Component } from "react";
import queryString from "query-string";
import http from "./httpservice";
import Mobileappleftpannel from "./mobileappleftpannel";
class MobileappCont extends Component {
    state={
        arrdata:[],
        brandarr:["Samsung", "Xiaomi", "Realme", "Apple"],
        ramarr:["3GB", "4GB", "6GB", "8GB"],
        romarr:["32GB", "64GB", "128GB", "256GB"],
        osarr:["Android", "iOS"],
    }
    async fetchData(options){
        let response=""; 
        let brand=this.props.match.params.brand;
        let RAM=this.props.match.params.RAM;
        let ROM=this.props.match.params.ROM;
        let OS=this.props.match.params.OS;
        if(brand){
            response = await http.get(`/svrr/mobile/brand/${brand}`); 
        }
        else if(RAM){
            response = await http.get(`/svrr/mobile/ram/${RAM}`); 
        }
        else if(ROM){
            response = await http.get(`/svrr/mobile/rom/${ROM}`); 
        }
        else if(OS){
            response = await http.get(`/svrr/mobile/os/${OS}`); 
        }
        else{
        
            response = await http.get("/svrr/mobile");  
        }      
        let {data}=response;
        console.log(data);
    
        this.setState({arrdata:data});
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(prevProps,prevState){
     if(prevProps!==this.props) this.fetchData();
    }
    sort=(num)=>{
           let s1={...this.state};
        switch(num){
            case 1:s1.arrdata.sort((n1,n2)=>(n1.name.localeCompare(n2.name)));break;
            case 2:s1.arrdata.sort((n1,n2)=>(n1.price-n2.price));break;
            case 3:s1.arrdata.sort((n1,n2)=>(n1.brand.localeCompare(n2.brand)));break;
            case 4:s1.arrdata.sort((n1,n2)=>(n1.RAM.localeCompare(n2.RAM)));break;
            case 5:s1.arrdata.sort((n1,n2)=>(n1.ROM.localeCompare(n2.ROM)));break;
            case 6:s1.arrdata.sort((n1,n2)=>(n1.OS.localeCompare(n2.OS)));break;
            default:
        }
        this.setState(s1);

    }
    editTable=(name)=>{
        this.props.history.push(`/mobilenewform/${name}/edit`);
    }
    deleteRow=(name)=>{
        console.log(name);
        this.props.history.push(`/mobileappdelete/${name}/delete`);
    }
    filterParams=(arr,queryParams)=>{
        let {brand,RAM,ROM}=queryParams;
        arr=this.filterParam(arr,"brand",brand);
        arr=this.filterParam(arr,"RAM",RAM);
        arr=this.filterParam(arr,"ROM",ROM);
        return arr;
    };
    filterParam=(arr,name,values)=>{
        if(!values) return arr;
        let valuesArr=values.split(",");
        let arr1= arr.filter((a1)=>valuesArr.find((val)=>val===a1[name]));
        
        return arr1;
    };
    handleOptionChange=(options)=>{
        this.callURL(`/mobilecontent`,options);
       

    }   
    callURL=(url,options)=>{
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname:url,
            search:searchString,
        });
    } ;
    makeSearchString = (options)=>{
        let {brand,RAM,ROM}=options;
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"brand",brand);
        searchStr=this.addToQueryString(searchStr,"RAM",RAM);
        searchStr=this.addToQueryString(searchStr,"ROM",ROM);
        return searchStr;

    }
    addToQueryString = (str,paramName,paramValue)=>
        paramValue ? 
        str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}`: str;

    render() {
        let {arrdata=[],brandarr,ramarr,romarr,osarr}=this.state;
        let queryParams=queryString.parse(this.props.location.search);
        let arrdata1=this.filterParams(arrdata,queryParams); 
        console.log(arrdata1);
        return ( <div className = " mt-2"> 
        <div className="row"><div className="col-2">
            <Mobileappleftpannel brandarr={brandarr} ramarr={ramarr}  romarr={romarr} osarr={osarr} options={queryParams}    onOptionChange={this.handleOptionChange} /></div>
            <div className="col-10">
        <div className="row bg-dark text-light">
        <div className="col-2" onClick={()=>this.sort(1)}>Name</div>
        <div className="col-2" onClick={()=>this.sort(2)}>Brand</div>
        <div className="col-2" onClick={()=>this.sort(3)}>Price</div>
        <div className="col-1" onClick={()=>this.sort(5)}>RAM</div>
        <div className="col-1" onClick={()=>this.sort(6)}>ROM</div>
        <div className="col-2" onClick={()=>this.sort(7)}>OS</div>
        </div>
        <div className="col-2" ></div>
       
        {arrdata1.map((n1,index)=>(
            <React.Fragment>
            <div className="row border">
                <div className="col-2" >{n1.name}</div>
        <div className="col-2">{n1.brand}</div>
        <div className="col-2">{n1.price}</div>
        <div className="col-1">{n1.RAM}</div>
        <div className="col-1">{n1.ROM}</div>
        <div className="col-2">{n1.OS}</div>
        <div className="col-2" ><button className="btn btn-success" onClick={()=>this.editTable(n1.name)}>Edit</button>
        <button className="btn btn-danger" onClick={()=>this.deleteRow(n1.name)}>Delete</button></div>

            </div>
            
            </React.Fragment>

        ))}
        </div></div>
       
        
        </div>)
    }

}
export default MobileappCont;