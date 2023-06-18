import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { Admin } from "./adminModel";

export const getAdminByCookieMain = createAsyncThunk("get-admin-by-cookie", async (_, thunkApi) => {
 try {  
    const { data } = await axios.get("/api/admin/retrieve/get-admin-by-cookie"); 
   console.log('data')
    if (!data) throw new Error("Couldn't receive data from axios GET '/get-admin-by-cookie' from: adminAPI ");
    const { adminData } = data;  
      console.log(adminData)
    return adminData;
  } catch (error: any) {
    console.error(error.response.data.error);
    return thunkApi.rejectWithValue({
      error: error.response.data.error,
      message: error.response.data.error,
    });
  }
 }
);





