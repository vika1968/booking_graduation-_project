
import express from "express";
import { login, register, getUser, updateUser, deleteUser, getUserByID, getUsers} from "./usersCtrl";

const userRouter = express.Router();

userRouter
  .get("/", getUsers)
  .get("/:id", getUserByID)
  .get("/retrieve/get-user-by-cookie", getUser)  
  .post("/login", login)
  .post("/register", register)
  .put("/update-user", updateUser)
  .delete("/:id", deleteUser)



export default userRouter;



