import React,{Component} from "react";
class Mobileappleftpannel extends Component{
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let options = {...this.props.options};
        options[input.name]=this.updateCBs(options[input.name],input.checked,input.value);
        this.props.onOptionChange(options);

    };
    updateCBs=(inpValue,checked,value)=>{
        console.log(checked);
        let inpArr = inpValue ? inpValue.split(",") : [];
        if(checked) inpArr.push(value);
        else{
            let index = inpArr.findIndex((ele)=>ele===value);
            if(index>=0) inpArr.splice(index,1);
            
        }
        return inpArr.join(",");
    };
    makeCheckboxes = (arr,values,name,label) =>(
        <React.Fragment>
            <label className="form-check-label font-weight-bold">{label}</label>
            {
                
                arr.map((opt)=>(
                    <div className="form-check" key={opt}>
                        <input className="form-check-input" value={opt} type="checkbox" name={name}
                        checked={values.find((val)=>val===opt) || false}
                        onChange={this.handleChange}/>
                        <label className="form-check-label">{opt}</label>
                    </div>
                ))
            }

        </React.Fragment>
    )
    render(){
        let {brand="",RAM="",ROM=""}=this.props.options;
        let {brandarr,ramarr,romarr}=this.props;
        return(
            <React.Fragment>
            <div className="row"> 
            <div className="col-12">
                   {this.makeCheckboxes(brandarr,brand.split(","),"brand","Select Brand")}
               </div>
               <div className="col-12">
                   {this.makeCheckboxes(ramarr,RAM.split(","),"RAM","Select Ram")}
               </div>
               <div className="col-12">
                   {this.makeCheckboxes(romarr,ROM.split(","),"ROM","Select Rom")}
               </div>
            </div>
            </React.Fragment>
       )
    }

}
export default Mobileappleftpannel;