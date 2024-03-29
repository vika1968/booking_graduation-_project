"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("client"));
const adminRoutes_1 = __importDefault(require("./API/admin/adminRoutes"));
app.use("/api/admin", adminRoutes_1.default);
const hotelsRoutes_1 = __importDefault(require("./API/hotels/hotelsRoutes"));
app.use("/api/hotels", hotelsRoutes_1.default);
const roomsRoutes_1 = __importDefault(require("./API/rooms/roomsRoutes"));
app.use("/api/rooms", roomsRoutes_1.default);
const usersRoutes_1 = __importDefault(require("./API/users/usersRoutes"));
app.use("/api/users", usersRoutes_1.default);
const ordersRoutes_1 = __importDefault(require("./API/orders/ordersRoutes"));
app.use("/api/orders", ordersRoutes_1.default);
app.listen(port, () => {
    console.log(`'MySql' server is running on port ${port}`);
});
