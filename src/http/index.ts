import axios, { AxiosInstance } from "axios"

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  }
})

export default httpClient
