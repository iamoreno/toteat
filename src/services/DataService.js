import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/backupdatadev/ejercicio/ventas.json",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getData() {
    return request.get();
  }
};
