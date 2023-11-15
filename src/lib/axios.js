import axios from "axios";

export const api = axios.create({
  baseURL: "http://20.14.87.19/api/",
});
