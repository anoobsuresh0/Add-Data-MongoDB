import React, { useState, useEffect } from "react";
import axios from "axios";
import TableForm from "./components/TableForm";
import "./App.css";
const App = () => {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tables");
      if (Array.isArray(response.data)) {
        setTables(response.data as any);
      } else {
        setError("Invalid data format: tables not found");
      }
      setError("");
    } catch (error) {
      console.error("Error fetching tables:", error);
      setError("Error fetching tables");
    }
  };

  const renderTables = () => {
    if (error) {
      return <div className="error">Error: {error}</div>;
    }
    return tables.map((table: { _id: string, name: string, columns: { _id: string, name: string, dataType: string }[] }) => (
      <div key={table._id} className="table">
        <h2>{table.name}</h2>
        <ul>
          {table.columns.map((column) => (
            <li key={column._id}>
              {column.name} - {column.dataType}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="app">
      <h1>Dynamic Table and Column Creation</h1>

      <TableForm fetchTables={fetchTables} />

      <div className="table-container">{renderTables()}</div>
    </div>
  );
};

export default App;
