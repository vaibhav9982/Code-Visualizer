import axios from "axios";

const API = "http://localhost:5000/api";

export const getProject = async(projectId)=>{
    const res = await axios.get(`${API}/`)

}