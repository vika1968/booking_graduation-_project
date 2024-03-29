import { DataGrid, GridColDef, GridEditCellProps } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { UserInterface } from "../../helpers/userInterface";
import { HotelInterface } from "../../helpers/hotelInterface";
import { RoomInterface } from "../../helpers/roomInterface";
import { showToast } from "../../helpers/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HotelFieldsToUpdateInterface } from "../../helpers/hotelFieldsToUpdate";
import axios from "axios";
import "./datatable.scss";

interface Row {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  columns: GridColDef[];
}

const DataTable: React.FC<DataTableProps> = ({ columns }) => {
  const navigate = useNavigate();
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

  const handleViewTransactions = (id: string) => {  
    navigate(`/users/trans?${id}`);
  };
  

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/${path}/${id}`);
      const { message } = response.data;
    
      showToast(message, "success no redirect", "");
      
      setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
    } catch (error: any) {    
     showToast(error.response.data.error, "error no redirect", "");
    }
  };

  const handleUpdate = async (id: string, updatedFields: HotelFieldsToUpdateInterface) => {
    try {
      const response = await axios.put(`/api/${path}/${id}`, updatedFields);
      const { message } = response.data;    
      showToast(message, "success no redirect", "");

      setList(
        (prevList) =>
          prevList?.map((item) =>
            item.id === id ? { ...item, ...updatedFields } : item
          ) ?? null
      );
    } catch (error: any) { 
    showToast(error.response.data.error, "error no redirect", "");
    }
  };

  const renderEditableCell = (params: GridEditCellProps) => {
    const { field, value } = params;

    if (field === "id") {
      return <div>{value}</div>;
    }

    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onClick={(e) => e.stopPropagation()}
      >
        {value}
      </div>
    );
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 400,
    renderCell: (params) => {
      return (
        <div className="cell-action">
          {path === "users" ? (           
             <div className="view-button" onClick={() => handleViewTransactions(params.row.id)}>View User Transactions</div>
          ) : (
            ""
          )}
          <div
            className="delete-button"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>

          {path === "hotels" && (
            <div
              className="update-button"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                handleUpdate(params.row.id, {
                  name: params.row.name,
                  type: params.row.type,
                  title: params.row.title,
                  city: params.row.city,
                })
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

    if (field === "id") {
      return;
    }

    // Get the original value from the state
    const originalValue = list?.find((item) => item.id === id)?.[field];

    if (originalValue !== value) {
      try {   
      await handleUpdate(id, { name: value, type: value, title: value, city: value});
      } catch (error: any) {   
        showToast(error.response.data.error, "error no redirect", "");
      }
    }
  };
  // Add editable property to each column to make them editable
  const editableColumns = columns.map((column) => ({
    ...column,
    editable: column.field !== "id", // Set editable to false for the 'id' column
    renderCell: renderEditableCell,
  }));

  return (
    <>
      <ToastContainer />
      <div className="data-table">
        <div className="data-table__title">
          {path}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="data-grid"
          rows={list || []}
          columns={
            path === "hotels"
              ? [...editableColumns, actionColumn]
              : columns.concat(actionColumn)
          }
          pagination
          checkboxSelection
          getRowId={(row) => row.id}
          onCellEditStop={handleCellEditStop}
        />
      </div>
    </>
  );
};

export default DataTable;
