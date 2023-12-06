import React,{Component} from "react";
import http from "./httpservice";
class MobileappForm extends Component{
   
    state={
        options:{name:"",brand:"",price:"",RAM:"",ROM:"",OS:""},
        brandarr:["Samsung", "Xiaomi", "Realme", "Apple"],
        ramarr:["3GB", "4GB", "6GB", "8GB"],
        romarr:["32GB", "64GB", "128GB", "256GB"],
        osarr:["Android", "iOS"],
        editIndex:0,
    }
    async fetchData1(options){
        let response="";
        let name=this.props.match.params.name;
        console.log(name);
        if(name){
            response = await http.get(`/svrr/mobile/name/${name}`); 
            let {data}=response;
            console.log(data);
                this.setState({options:data[0],editIndex:1});
        }
        else{  
        this.setState({options:{name:"",brand:"",price:"",RAM:"",ROM:"",OS:""},editIndex:0});
        } 
    }
    componentDidMount(){
        this.fetchData1();
    }
    componentDidUpdate(prevProps,prevState){
     if(prevProps!==this.props) this.fetchData1();
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state};
            s1.options[input.name]=input.value;
            this.setState(s1);
    };
    submitbtnfun=()=>{
        let s1={...this.state};
        
       this.fetchData(s1.options);
        this.setState(s1);
    }
    async fetchData(options){
        let response=""; 
        let s1={...this.state};
        let name=this.props.match.params.name;
        if(s1.editIndex===1){
            response = await http.put(`/svrr/mobile/${name}`,options);  
            this.props.history.push("/mobilecontent");
        }
        else{
         let arr=[options.name,options.brand,options.price,options.RAM,options.ROM,options.OS];  
         response = await http.post("/svrr/mobile",arr); 
         this.props.history.push("/mobilecontent");
        } 
        
    }
    
    makeDropdown=(arr,value,name,label)=>
    {
        let str="";
        return <div className="form-group">  
        <label>{label}</label>  
            <select className="form-control" name={name} value={value} onChange={this.handleChange}>
            <option  value="" disabled>Select {label}</option>
                {arr.map((opt,index)=>
                (
                str=<option value={opt} key={index}>{opt}</option>
            
                ))}
            </select>
        </div>
    }
    makeradios = (arr,values,name,label) =>(
        <React.Fragment>
            <label className="form-check-label font-weight-bold">{label}</label><br/>
            {
                
                arr.map((opt)=>(
                    <div className="form-check-inline" key={opt}>
                        <input className="form-check-input" value={opt} type="radio" name={name}
                        checked={opt===values}
                        onChange={this.handleChange}/>
                        <label className="form-check-label">{opt}</label>
                    </div>
                ))
            }

        </React.Fragment>
    )
render(){
    let {name="",brand="",price="",RAM="",ROM="",OS=""}=this.state.options;
    let {brandarr,ramarr,romarr,osarr}=this.state;
    return(<div className="container">
                        <div className="form-group">
                            <label>Name</label>
                        <input className="form-control" type="text" name="name" value={name} onChange={this.handleChange} />
                        </div>
                        {this.makeDropdown(brandarr,brand,"brand","Brand")}
                        <div className="form-group">
                            <label>Price</label>
                        <input className="form-control" type="number" name="price" value={price} onChange={this.handleChange} />
                        </div>
                        {this.makeDropdown(ramarr,RAM,"RAM","RAM")} 
                        {this.makeDropdown(romarr,ROM,"ROM","ROM")}      
                        {this.makeradios(osarr,OS,"OS","OS")}<br/>
                        <button className="btn btn-primary mt-2" onClick={()=>this.submitbtnfun()}>Submit</button>


    </div>)
}

}
export default MobileappForm;