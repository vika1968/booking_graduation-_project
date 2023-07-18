import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');

export const getAdminBySession = createAsyncThunk("get-admin-by-session", async (_, thunkApi) => {
 try {  
    const { data } = await axios.get(`${SERVER_URL}/api/admin/retrieve/get-admin-by-session/${sessionStorage.getItem("adminId")}`, { withCredentials: true }); 
    if (!data) throw new Error("Couldn't receive data from axios GET '/get-admin-by-session' from: adminAPI ");
    const { adminData } = data;   
    
    return adminData;

  } catch (error: any) {
    return thunkApi.rejectWithValue({
      error: error.response.data.error,
      message: error.response.data.error,
    });
  }
 }
);





