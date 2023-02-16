import axios from "axios";
const BaseURL = process.env.REACT_APP_API_ENDPOINT
const api = axios.create({
 baseURL: BaseURL,
});

export default api;