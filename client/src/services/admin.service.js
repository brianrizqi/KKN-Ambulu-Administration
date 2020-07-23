import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = process.env.API_URL || 'http://localhost:3000/letter';

class AdminService {
  static getLetterCategories() {
    return axios.get(`${API_URL}/categories`, {
        headers: authHeader()
      })
      .then((response) => {
        return response.data;
      });
  }
  
  static createLetter(data) {
    const postData = JSON.parse(JSON.stringify(data));
    return axios.post(`${API_URL}/create`, postData, {
        headers: authHeader()
      })
      .then((response) => {
        return response.data;
      });
  }
  
  static getLetters(options) {
    return axios.get(`${API_URL}/`, {
        params: options,
        headers: authHeader()
      })
      .then((response) => {
        return response.data;
      })
  }
}

export default AdminService;
