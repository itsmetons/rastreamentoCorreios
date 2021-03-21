import axios from "axios";
const Api = axios.create({
  baseURL: "https://correios-ancoradev.herokuapp.com/",
});

export default Api;
