import React, { useState, useEffect } from 'react';

function TableForm({ fetchTables }: { fetchTables: () => void }) {
  const [tableName, setTableName] = useState('');
  const [foreignKeyId, setForeignKeyId] = useState('');
  const [columns, setColumns] = useState([{ name: '', dataType: '' }]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTableIds();
  }, []);

  const fetchTableIds = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tables'); 
      if (response.ok) {
        const data = await response.json();
        setTables(data); 
      } else {
        console.error('Failed to fetch table data');
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', dataType: '' }]);
  };

  const handleColumnNameChange = (index: number,  value: string) => {
    const newColumns = [...columns];
    newColumns[index].name = value;
    setColumns(newColumns);
  };

  const handleDataTypeChange = (index: number,  value: string) => {
    const newColumns = [...columns];
    newColumns[index].dataType = value;
    setColumns(newColumns);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tableName, foreignKeyId, columns }),
      });
      if (res.ok) {
        console.log('Table created successfully');
        fetchTables();
      } else {
        console.error('Failed to create table');
      }
    } catch (err) {
      console.error('Error creating table:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <select value={foreignKeyId} onChange={(e) => setForeignKeyId(e.target.value)}>
          <option value="">Select Foreign Key</option>
          {tables.map((table: { _id: string, name: string }) => (
            <option key={table._id} value={table._id}>
              {table.name}
            </option>
          ))}
        </select>
        {columns.map((col, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Column Name"
              value={col.name}
              onChange={(e) => handleColumnNameChange(index, e.target.value)}
            />
            <input
              type="text"
              placeholder="Data Type"
              value={col.dataType}
              onChange={(e) => handleDataTypeChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddColumn}>
          Add Column
        </button>
        <button type="submit">Create Table</button>
      </form>
    </div>
  );
}

export default TableForm;
