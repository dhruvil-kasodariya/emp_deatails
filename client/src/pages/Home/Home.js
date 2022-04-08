import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrView, GrTrash, GrEdit, GrSearch } from "react-icons/gr";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header.js";
import "./Home.css";
import Pagination from "../../components/pagination/Pagination";
const RecordPerPage = 5; //for max record on one page

function Home() {
  const [data, setData] = useState([]);
  const [pageRecord, setPageRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //get all data
  const loadData = async () => {
    const response = await axios.get("https://retoolapi.dev/yObB4E/emp_data");
    // const response = await axios.get("http://localhost:4000/api/get");
    const reverse = await response.data;
    reverse.reverse(); //reverse array
    setData(reverse);
    setPageRecord(response.data.slice(0, RecordPerPage));
  };

  //delete data
  const handleDelete = async (id) => {
    const response = await axios.delete(
      "https://retoolapi.dev/yObB4E/emp_data/" + id
    );
    const status = JSON.stringify(response.status);
    loadData();
    setTimeout(() => {
      status === "200"
        ? alert("Record Delete successfully")
        : alert("Some error occur");
    }, 1000);
  };

  //pagination

  //for total number of page
  const TotalPage = Math.ceil(data.length / RecordPerPage);
  const pageNumber = [];
  for (let i = 1; i <= TotalPage; i++) {
    pageNumber.push(i);
  }

  //set data on page
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * RecordPerPage;
    const lastIndex = startIndex + RecordPerPage;
    const paginatedRecord = data.slice(startIndex, lastIndex);
    setPageRecord(paginatedRecord);
  };

  //for previous page
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    const lastIndex = (currentPage - 1) * RecordPerPage;
    const startIndex = lastIndex - RecordPerPage;
    const paginatedRecord = data.slice(startIndex, lastIndex);
    setPageRecord(paginatedRecord);
  };

  //for next page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    const lastIndex = (currentPage + 1) * RecordPerPage;
    const startIndex = lastIndex - RecordPerPage;
    const paginatedRecord = data.slice(startIndex, lastIndex);
    setPageRecord(paginatedRecord);
  };

  //search
  const searchHandle = (e) => {
    const value = e.target.value;
    setSearch({ ...search, value });
  };
  console.log(search.value);
  const searchSubmit = async (e) => {
    e.preventDefault();
    if (search !== "") {
      const newData = await data.filter((data) => {
        const newSearch = Object.values(search).join("").toLowerCase();
        return Object.values(data).join("").toLowerCase().includes(newSearch);
      });
      setSearchResult(newData);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header btnAdd="ADD" loadData={loadData} />
      <form onSubmit={searchSubmit} className="searchForm">
        <input
          type="text"
          className="searchBar"
          placeholder="Search..."
          onChange={searchHandle}
        />
        <button type="submit" className="btn-search">
          <GrSearch />
        </button>
      </form>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="tr">No</th>
              <th className="tr">Employee Name</th>
              <th className="tr">Employee Address</th>
              <th className="tr">Employee Salary</th>
              <th className="tr">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(search).join("").length < 1
              ? pageRecord.map((emp, index) => {
                  return (
                    <tr key={emp.id}>
                      <th className="tr" scope="row">
                        {index + 1}
                      </th>
                      <td className="td">{emp.emp_name}</td>
                      <td className="td">{emp.emp_add}</td>
                      <td className="td">{emp.emp_salary}</td>
                      <td className="tdAction">
                        <Link to={"/view/" + emp.id}>
                          <button className="btn_view">
                            <GrView />
                          </button>
                        </Link>
                        <button
                          className="btn_delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this information"
                              )
                            )
                              handleDelete(emp.id);
                          }}
                        >
                          <GrTrash />
                        </button>
                        <Modal
                          id={emp.id}
                          btnEdit={<GrEdit />}
                          loadData={loadData}
                        />
                      </td>
                    </tr>
                  );
                })
              : searchResult.map((emp, index) => {
                  return (
                    <tr key={emp.id}>
                      <th className="tr" scope="row">
                        {index + 1}
                      </th>
                      <td className="td">{emp.emp_name}</td>
                      <td className="td">{emp.emp_add}</td>
                      <td className="td">{emp.emp_salary}</td>
                      <td className="tdAction">
                        <Link to={"/view/" + emp.id}>
                          <button className="btn_view">
                            <GrView />
                          </button>
                        </Link>
                        <button
                          className="btn_delete"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this information"
                              )
                            )
                              handleDelete(emp.id);
                          }}
                        >
                          <GrTrash />
                        </button>
                        <Modal id={emp.id} btnEdit={<GrEdit />} />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          search={search}
          previousPage={previousPage}
          currentPage={currentPage}
          nextPage={nextPage}
          pagination={pagination}
          pageNumber={pageNumber}
        />
      </div>
    </>
  );
}
export default Home;
