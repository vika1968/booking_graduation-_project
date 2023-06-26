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

interface DataTableProps {
  columns: GridColDef[];
}

const DataTable: React.FC<DataTableProps> = ({ columns }) => {
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
      const response = await axios.delete(`/api/${path}/${id}`);
      const { message } = response.data;
      alert(message);

      setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const handleUpdate = async (id: string, updatedFields: any) => {
    try {
      const response = await axios.put(`/api/${path}/${id}`, updatedFields);
      const { message } = response.data;
      alert(message);

      setList(
        (prevList) =>
          prevList?.map((item) =>
            item.id === id ? { ...item, ...updatedFields } : item
          ) ?? null
      );
    } catch (error: any) {
      alert(error.response.data.error);
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
        await handleUpdate(id, { [field]: value });
      } catch (error: any) {
        alert(error.response.data.error);
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
        onCellEditStop={handleCellEditStop}
      />
    </div>
  );
};

export default DataTable;
