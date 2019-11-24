import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import UserContext from "../utils/UserContext";

function DataArea() {

  const [users, setUsers] = useState({
    users: [{}],
    filteredUsers: [{}]
  });

  const [order, setOrder] = useState({
    order: "descend"
  });

  const [headings] = useState([
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]);

  useEffect(() => {
    API.getUsers().then(results => {
      console.log("API results", results.data.results);
      setUsers({
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, []);

  function handleSort(heading) {

    if (order === "descend") {
      setOrder({
        order: "ascend"
      })
    } else {
      setOrder({
        order: "descend"
      })
    }

    function compareFnc(a, b) {
      if (order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }
    }
    const sortedUsers = users.filteredUsers.sort(compareFnc);
    setUsers({ ...users, filteredUsers: sortedUsers });
  }

  function handleSearchChange(event) {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = users.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setUsers({ ...users, filteredUsers: filteredList });
  }

  function handleDOBSort(event) {
    event.preventDefault();
    const fromDate = new Date(document.getElementById("from-date").value);
    const toDate = new Date(document.getElementById("to-date").value);

    const filterDOB = users.users.filter(item => {
      const newDate = new Date(item.dob.date)
      return newDate > fromDate && newDate < toDate
    });
    setUsers({ ...users, filteredUsers: filterDOB });
  }

return (
  <UserContext.Provider value = {{ headings, users, order, handleSort, handleSearchChange, handleDOBSort}}>
    <Nav />
    <div className="data-area">
      <DataTable />
    </div>
  </UserContext.Provider>
);
};

export default DataArea
      
      

      

