import axios from "axios";
const Api = axios.create({
  baseURL: "https://correios.contrateumdev.com.br/api",
});

export default Api;
