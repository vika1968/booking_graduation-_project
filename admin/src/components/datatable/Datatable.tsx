
import "./datatable.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

interface Row {
  id: string;
  [key: string]: any;
}

interface DatatableProps {
  columns: GridColDef[];
}

const Datatable: React.FC<DatatableProps> = ({ columns }) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState<Row[] | null>(null);
  const { data, loading, error } = useFetch(`/api/${path}`);

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const updatedRows = data.map((row: any) => ({
  //       id: row.userID.toString(), // Assigning the unique identifier to the `id` property
  //       ...row,
  //     }));
  //     setList(updatedRows);
  //   } else {
  //     setList([]);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data && data.length > 0) {
      let updatedRows: Row[] = [];
  
      if (path === 'users') {
        updatedRows = data.map((row: any) => ({
          id: row.userID.toString(),
          ...row,
        }));
      } else if (path === 'hotels') {

        console.log('hotels!!!!!')
        updatedRows = data.map((row: any) => ({
          id: row.hotelID.toString(),
          ...row,
        }));
      } else if (path === 'rooms') {
        updatedRows = data.map((row: any) => ({
          id: row.roomID.toString(),
          ...row,
        }));
      }
  
      setList(updatedRows);
    } else {
      setList([]);
    }
  }, [data]);
  
  
  const handleDelete = async (id: string) => {
    try {
     // await axios.delete(`/api/${path}/${id}`);

     const response = await axios.delete(`/api/${path}/${id}`);
     const { message } = response.data;
     alert(message);
     
      setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
    } catch (err) {
      console.error(err);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to="/users/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id as string)}
          >
            Delete
          </div>
        </div>
      );
    },
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/api/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list || []}
        columns={columns.concat(actionColumn)}
        pagination
        // pageSize={9}
        // rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Datatable;
