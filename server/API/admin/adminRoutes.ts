
import express from "express";
import { getAdmin, login, register} from "./adminCtrl";

const adminRouter = express.Router();

adminRouter
  .get("/retrieve/get-admin-by-cookie", getAdmin)  
  .post("/login", login)
  // .post("/register", register)
export default adminRouter;



