import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserByCookieMain = createAsyncThunk("get-user-by-cookie", async (_, thunkApi) => {
 try { 
    const { data } = await axios.get("/api/users/retrieve/get-user-by-cookie");
    if (!data) throw new Error("Couldn't receive data from axios GET '/get-user-by-cookie' from: userAPI ");
    const { userData } = data;  
    return userData;
  } catch (error: any) {
   // console.error(error.response.data.error);
    return thunkApi.rejectWithValue({
      error: error.response.data.error,
      message: error.response.data.error,
    });
  }
 }
);





