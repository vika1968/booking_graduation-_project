import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../../config/config";
import axios from "axios";

export const getUserByCookieMain = createAsyncThunk("get-user-by-cookie", async (_, thunkApi) => {
 try { 
    const { data } = await axios.get(`${SERVER_URL}/api/users/retrieve/get-user-by-cookie`, { withCredentials: true });
    if (!data) throw new Error("Couldn't receive data from axios GET '/get-user-by-cookie' from: userAPI ");
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





