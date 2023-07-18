
import express from "express";
import { login, register, getUserBySessionStorage , deleteUser, getUserByID, getUsers} from "./usersCtrl";

const userRouter = express.Router();

userRouter
  .get("/", getUsers)
  .get("/:id", getUserByID)
  .get("/retrieve/get-user-by-session/:sesStor", getUserBySessionStorage)
  .post("/login", login)
  .post("/register", register)
  .delete("/:id", deleteUser)

export default userRouter;



