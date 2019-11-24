import React, { useContext } from "react";
import "../styles/SearchBox.css";
import UserContext from "../utils/UserContext";

function SearchBox() {
  const { handleSearchChange, handleDOBSort } = useContext(UserContext)
  return (
    <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />
        <button className="btn my-2 my-sm-0" type="submit" onClick = {event => handleDOBSort(event)}>
          Search
        </button>
      </form>
    </div>
  );
}
export default SearchBox;
