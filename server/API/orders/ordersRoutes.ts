import express from "express";
import { getOrdersByUserID } from "./ordersCtrl";


const orderRouter = express.Router();

orderRouter.get("/:id", getOrdersByUserID);

export default orderRouter;




