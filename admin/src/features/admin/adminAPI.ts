import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";

export const getAdminByCookieMain = createAsyncThunk("get-admin-by-cookie", async (_, thunkApi) => {
 try {  
    const { data } = await axios.get(`${SERVER_URL}/api/admin/retrieve/get-admin-by-cookie`); 
    if (!data) throw new Error("Couldn't receive data from axios GET '/get-admin-by-cookie' from: adminAPI ");
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





