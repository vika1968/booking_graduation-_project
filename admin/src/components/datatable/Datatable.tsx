import React, { useEffect, useState } from 'react';
import "./datatable.scss";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import useFetch from '../../hooks/useFetch';

interface DatatableProps {
  columns: any[]; // Замените any на конкретные типы столбцов, если есть
}

const Datatable: React.FC<DatatableProps> = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState<any[]>();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list!.filter((item) => item._id !== id));
    } catch (err) {}
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row._id}>
              {columns.map((column) => (
                <td key={column.field}>{row[column.field]}</td>
              ))}
              <td>
                <div className="cellAction">
                  <Link to="/users/test" style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                  </Link>
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
