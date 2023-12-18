import axios from "axios";

export const readAllFleamarket = () => {
    return axios.get("http://192.168.1.2:8080/api/v1/trade-posts")
}