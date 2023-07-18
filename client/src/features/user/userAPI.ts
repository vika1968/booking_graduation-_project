import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');

export const getUserBySession = createAsyncThunk("get-user-by-session", async (_, thunkApi) => {
  try { 
     const { data } = await axios.get(`${SERVER_URL}/api/users/retrieve/get-user-by-session/${sessionStorage.getItem("userId")}`, { withCredentials: true });
     if (!data) throw new Error("Couldn't receive data from axios GET '/get-user-by-session' from: userAPI ");
     const { userData } = data;  
     return userData;
   } catch (error: any) {
     return thunkApi.rejectWithValue({
       error: error.response.data.error,
       message: error.response.data.error,
     });
   }
  }
 );




