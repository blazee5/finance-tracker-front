import axios from "axios";

export const api = axios.create({
    baseURL: "https://71cb-213-232-244-1.ngrok-free.app",
    headers: {
        "ngrok-skip-browser-warning": true
    }
});