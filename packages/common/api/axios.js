import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  timeout: 3000
});

export default instance;
