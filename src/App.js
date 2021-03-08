import "./App.scss";
import "./focus.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

let originalList = [];

const App = () => {
  const [employeeList, setEmployeeList] = useState([]);

  const fetchEmployeeData = async () => {
    axios
      .get("https://dummyapi.io/data/api/user?limit=30", {
        headers: { "app-id": "603cf42ce277109305c74321" },
      })
      .then(({ data }) => {
        console.log(data.data);
        setEmployeeList(data.data);
        originalList = [...data.data];
      });
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  function searchEmployee(search) {
    
    const filteredNames = originalList.filter((city) => {
    
      const text = search.toUpperCase();
      const employeeName =
        city.firstName.toUpperCase() + " " + city.lastName.toUpperCase();

      return employeeName.indexOf(text) > -1;
    });

    setEmployeeList(filteredNames);
  }

  return (
    <div className="container">
      <p>Employees of the Nigranac company</p>
      <input
        placeholder="search employee..."
        onChange={(value) => searchEmployee(value.target.value)}
      />

      {employeeList.map((emp) => (
        <div className="employee-box">
          <div>
            <img src={emp.picture}></img>
          </div>

          <div>
            <h1 className="name">
              Name and Surname :{" "}
              <span>
                {emp.firstName} {emp.lastName}
              </span>
            </h1>
            <h1 className="address">
              {" "}
              Address : <span>{emp.email}</span>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
