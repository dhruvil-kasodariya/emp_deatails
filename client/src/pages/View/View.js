import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";
import Header from "../../components/Header/Header";

function View() {
  const [data,setData] = useState([]);
  const { id } = useParams();

  useEffect(()=>{
    const loadData=async()=>{
    const url =`https://retoolapi.dev/yObB4E/emp_data/`+id;
    const response =await axios.get(url);
    setData(response.data);
}
   loadData();
  },[id])

  return ( 
    <>
<Header btnEdit="EDIT" id={id}/>
 
    <form>
     <div className="div">
        <h1 className="h1">Employee Detail</h1>  
        <table className="cardTable">
          <tbody>
            <tr>
              <th>
                <strong>Employee Name:</strong>
              </th>
              <td>
                <span>{data.emp_name}</span>
              </td>
            </tr>
            <tr>
              <th>
                <strong>Employee Address:</strong>
              </th>
              <td>
                <span>{data.emp_add}</span>
              </td>
            </tr>
            <tr>
              <th>
                <strong>Employee Salary:</strong>
              </th>
              <td>
                <span>{data.emp_salary}</span>
              </td>
            </tr>
          </tbody>        
        </table>
        <Link to={"/"}>
          <button value="Exit" className="btn-exit">Exit</button>
        </Link>
        {/* <Link to={"/view/"+(data.id -1)}>
        <button >Previous</button>  
        </Link>
        <Link to={"/view/"+(data.id +1)}>
        <button >Next</button>  
        </Link> */}
    </div>      
    </form>
    
   </>
  );
}
export default View;
