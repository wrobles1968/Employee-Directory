import React, {useContext} from "react";
import DataBody from "./DataBody";
import "../styles/DataTable.css";
import UserContext from "../utils/UserContext";

function DataTable() {
  const { headings, handleSort} = useContext(UserContext);
  return (
    <div className="datatable mt-5">
      <table
        id="table"
        className="table table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            {headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    handleSort(name.toLowerCase());
                  }}
                >
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })}
          </tr>
        </thead>

        <DataBody />
      </table>
    </div>
  );
}

export default DataTable;
