import { DataGrid, GridColDef, GridEditCellProps } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { UserInterface } from "../../helpers/userInterface";
import { HotelInterface } from "../../helpers/hotelInterface";
import { RoomInterface } from "../../helpers/roomInterface";
import "./dataTable.scss";

interface Row {
  id: string;
  [key: string]: any;
}

interface DatatableProps {
  columns: GridColDef[];
}

const DataTable: React.FC<DatatableProps> = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState<Row[] | null>(null);
  const { data, loading, error } = useFetch(`/api/${path}`);

  useEffect(() => {
    if (data && data.length > 0) {   
      let updatedRows: Row[] = [];

      if (path === "users") {
        updatedRows = data.map((row: UserInterface) => ({
          id: row.userID.toString(),
          ...row,
        }));
      } else if (path === "hotels") {
        updatedRows = data.map((row: HotelInterface) => ({
          id: row.hotelID.toString(),
          ...row,
        }));
      } else if (path === "rooms") {
        updatedRows = data.map((row: RoomInterface) => ({
          id: row.roomId.toString(),
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
      // console.log(`/api/${path}/${id}`);
      const response = await axios.delete(`/api/${path}/${id}`);

      const { message } = response.data;
      alert(message);

      setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const handleUpdate = async (
    id: string,
    name: string,
    type: string,
    title: string,
    city: string
  ) => {
    try {  
      const response = await axios.put(`/api/${path}/${id}`, {
        name,
        type,
        title,
        city,
      });

      const { message } = response.data;
      alert(message);

      setList(
        (prevList) =>
          prevList?.map((item) =>
            item.id === id ? { ...item, name, type, title, city } : item
          ) ?? null
      );
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const renderEditableCell = (params: GridEditCellProps) => {
    const { field, value } = params;
    // console.log(params);
    return (
      <div
        contentEditable
        suppressContentEditableWarning
       //  onBlur={(e) => handleUpdate(params.id as string, params.row.name, params.row.type, field as string, e.target.innerText)}
        onClick={(e) =>
          handleUpdate(
            params.row.id,
            params.row.name,
            params.row.type,
            params.row.title,
            params.row.city
          )
        }
        
      >
        {value}
      </div>
    );
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/users/test`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>

          {path === "hotels" && (
            <div
              className="updateButton"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                handleUpdate(
                  params.row.id,
                  params.row.name,
                  params.row.type,
                  params.row.title,
                  params.row.city
                )
              }
            >
              Update
            </div>
          )}
        </div>
      );
    },
  };


  const handleCellEditStop = async (params: GridEditCellProps) => {
    const { id, field, value } = params;
  
    try {
      await handleUpdate(
        id,
        params.row.name,
        params.row.type,
        field,
        value
      );
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };
  

  // Add editable property to each column to make them editable
  const editableColumns = columns.map((column) => ({
    ...column,
    editable: column.field !== "ID", // Set editable to false for the 'ID' column
    renderCell: renderEditableCell,
  }));

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list || []}       
        columns={
          path === "hotels"
            ? [...editableColumns, actionColumn]
            : columns.concat(actionColumn)
        }
        pagination
        checkboxSelection
        getRowId={(row) => row.id}
         // @ts-ignore
       //  onCellEditStop={handleUpdate}
    //  onCellEditStop={handleCellEditStop}
      />
    </div>
  );
};

export default DataTable;
