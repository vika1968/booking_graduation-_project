// import "./dataTable.scss";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch";
// import axios from "axios";
// import { UserInterface } from "../../helpers/userInterface";
// import { HotelInterface } from "../../helpers/hotelInterface";
// import { RoomInterface } from "../../helpers/roomInterface";

// interface Row {
//   id: string;
//   [key: string]: any;
// }

// interface DatatableProps {
//   columns: GridColDef[];
// }

// const DataTable: React.FC<DatatableProps> = ({ columns }) => {

//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   const [list, setList] = useState<Row[] | null>(null);
//   const { data, loading, error } = useFetch(`/api/${path}`);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       let updatedRows: Row[] = [];

//       if (path === 'users') {
//         updatedRows = data.map((row: UserInterface) => ({
//           id: row.userID.toString(),
//           ...row,
//         }));
//       } else if (path === 'hotels') {
//         updatedRows = data.map((row: HotelInterface) => ({
//           id: row.hotelID.toString(),
//           ...row,
//         }));
//       } else if (path === 'rooms') {
//         updatedRows = data.map((row: RoomInterface) => ({
//           id: row.roomId.toString(),
//           ...row,
//         }));
//       }

//      setList(updatedRows);

//     } else {
//       setList([]);
//     }
//   }, [data]);

//   const handleDelete = async (id: string) => {
//     try {
//       console.log(`/api/${path}/${id}`)
//      const response = await axios.delete(`/api/${path}/${id}`);

//      const { message } = response.data;
//      alert(message);

//       setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async (id: string) => {
//     try {
//       console.log(`/api/${path}/${id}`)
//      const response = await axios.put(`/api/${path}/${id}`);

//      const { message } = response.data;
//      alert(message);

//       setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const actionColumn: GridColDef = {
//     field: "action",
//     headerName: "Action",
//     width: 200,
//     renderCell: (params) => {
//       return (
//         <div className="cellAction">
//           <Link to="/users/test" style={{ textDecoration: "none" }}>
//             <div className="viewButton">View</div>
//           </Link>
//           <div
//             className="deleteButton"
//             onClick={() => handleDelete(params.row.id )}
//           >
//             Delete
//           </div>

//           <div
//             className="updateButton"
//             onClick={() => handleUpdate(params.row.id )}
//           >
//             Update
//           </div>

//         </div>
//       );
//     },
//   };

//   return (
//     <div className="datatable">
//       <div className="datatableTitle">
//         {path}
//         <Link to={`/${path}/new`} className="link">
//           Add New
//         </Link>
//       </div>
//       <DataGrid
//         className="datagrid"
//         rows={list || []}
//         columns={columns.concat(actionColumn)}
//         pagination
//         checkboxSelection
//         getRowId={(row) => row.id}
//       />
//     </div>
//   );
// };

// export default DataTable;

import "./dataTable.scss";
import { DataGrid, GridColDef, GridEditCellProps } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { UserInterface } from "../../helpers/userInterface";
import { HotelInterface } from "../../helpers/hotelInterface";
import { RoomInterface } from "../../helpers/roomInterface";

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

      console.log(data)
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
      console.log(`/api/${path}/${id}`);
      const response = await axios.delete(`/api/${path}/${id}`);

      const { message } = response.data;
      alert(message);

      setList((prevList) => prevList?.filter((item) => item.id !== id) ?? null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, name: string, type: string, title: string, city: string) => {
    
    try {
      console.log(name);
      console.log(type);
       console.log(city);
       console.log(`/api/${path}/${id}`);
      const response = await axios.put(`/api/${path}/${id}`, {
        name,
        type,
        title,
        city,
      });
  
      const { message } = response.data;
      alert(message);
  
      setList((prevList) =>
        prevList?.map((item) =>
          item.id === id ? { ...item, name, type, title, city } : item
        ) ?? null
      );
    } catch (err) {
      console.error(err);
    }
  };
  

  const renderEditableCell = (params: GridEditCellProps) => {
    const { field, value } = params;
  
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleUpdate(params.id as string, params.row.name, params.row.type, field as string, e.target.innerText)}
      >
        {value}
      </div>
    );
  }

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
              onClick={() => handleUpdate(params.row.id, params.row.name, params.row.type, params.row.title, params.row.city)}
            >
              Update
            </div>
          )}
        </div>
      );
    },
  };

  // Add editable property to each column to make them editable
  const editableColumns = columns.map((column) => ({
    ...column,
    editable: true,    
    renderCell: renderEditableCell  
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
        columns={[...editableColumns, actionColumn]}
        pagination
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default DataTable;
