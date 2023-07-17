import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import dotenv from "dotenv";
dotenv.config();

let environment = process.env.ENVIRONMENT;
let BACKEND_URL: string;

if (environment === "DEV") {
    BACKEND_URL = `http://localhost:8000`;
} else {
    BACKEND_URL = `https://hotel-booking-backend-fjj9.onrender.com`;
    disableReactDevTools(); 
}

export const SERVER_URL: string = BACKEND_URL;
export { environment };