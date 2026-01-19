import axios from "axios";

export const api = axios.create({
    baseURL: "https://coach-ecommerce.onrender.com",
});
