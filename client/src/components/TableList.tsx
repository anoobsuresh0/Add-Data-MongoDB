
function TableList({ tables }) {
  return (
    <div>
      <h2>Created Tables</h2>
      <ul>
        {tables.map(table => (
          <li key={table._id}>
            <h3>{table.name}</h3>
            <ul>
              {table.columns.map((col, index) => (
                <li key={index}>{col.name}: {col.dataType}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableList;
