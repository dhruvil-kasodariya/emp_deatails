import React, { useState ,useEffect} from "react";
import axios from "axios";
import "./AddEmp.css";

const initialState = {
  emp_name: "",
  emp_salary: "",
  emp_add: "",
};

function AddEmp({id ,setModal ,modal,loadData}) {
  const [emp, setEmp] = useState(initialState);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setEmp({ ...emp, [name]: value });
    console.log(emp);
  };

  //for update record
  const UpdateRecord = async()=>{
    const response =await axios.put("https://retoolapi.dev/yObB4E/emp_data/"+id,(emp))  
    setEmp(initialState)     
    const status =JSON.stringify(response.status)  
    setModal(!modal);
    setTimeout(() => {
      (status==="200")?alert("Record Update successfully"):alert("Some error occur"); 
    }, 1000);
    loadData(); 
  }

  //for add record
  const addRecord =async()=>{
    const response=await axios.post("https://retoolapi.dev/yObB4E/emp_data",(emp))
    setEmp(initialState)    
    const status =JSON.stringify(response.status)
    setModal(!modal);
    setTimeout(() => {
     (status==="201")?alert("Record Update successfully"):alert("Some error occur");  
    }, 1000);
   
    loadData();
  }

  useEffect(()=>{
    const loadData = async()=>{
      const url =`https://retoolapi.dev/yObB4E/emp_data/`+id;
        const response = await axios.get(url);
        console.log(response);
        setEmp(response.data);
    }
    loadData();
  },[id])

  const handleChange = (e) => {
    e.preventDefault();

      if(id){
      UpdateRecord();
      }else{
      addRecord();
      }
  };
  const handleReset=()=>{
    setEmp(initialState);
  }

  return (
    <div>
      <form onSubmit={handleChange}>
        <label>Employee Name</label>
        <input
          type="text"
          id="emp_name"
          name="emp_name"
          value={emp.emp_name}
          placeholder="enter your name here..."
          className="input"
          onChange={handleInputChange}
          required
        />

        <label>Employee Salary</label>
        <input
          type="number"
          id="emp_salary"
          name="emp_salary"
          value={emp.emp_salary}
          placeholder="enter your salary here..."
          onChange={handleInputChange}
          className="input"
          required
        />

        <label>Employee Address</label>
        <textarea
          id="emp_add"
          name="emp_add"
          cols="25"
          rows="3"
          value={emp.emp_add}
          placeholder="enter your address here..."
          onChange={handleInputChange}
          className="textarea"
          required
        /><br />
        <div className="divBtn">
           {!id ? (<button className="btn-submit" >Submit</button>) :(<button className="btn-submit">Update</button>)} 
            <button type="reset" className="btn-reset" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmp;
