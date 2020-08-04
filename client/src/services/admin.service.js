import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = (process.env.API_URL || 'http://localhost:3000/') + 'letter';

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
  
  static findLetter(query) {
    return axios.get(`${API_URL}/find`, {
        params: query,
        headers: authHeader()
      })
      .then((response) => {
        return response.data
      });
  }
  
  static updateLetter(letterData) {
    return axios.post(`${API_URL}/update`, letterData, {
        headers: authHeader()
      })
      .then((response) => {
        return response.data;
      });
  }
  
  static downloadLetter(id) {
    return axios.post(`${API_URL}/download`, {
      letterId: id
    }, {
      responseType: 'blob',
      headers: authHeader()
    });
  }
  
  static downloadExample() {
    return axios.get(`${API_URL}/download/example`, {
      headers: authHeader(),
      responseType: 'blob'
    }).then((res) => {
      return res.data;
    })
  }
  
  static addCategoryType(category, params) {
    return axios.post(`${API_URL}/${category}/add`, params,
      {
        'Content-Type': 'multipart/form-data',
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
  }
  
  static updateCategoryType(category, type, params) {
    return axios.put(`${API_URL}/${category}/${type}`, params,
      {
        'Content-Type': 'multipart/form-data',
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
  }
  
  static downloadCategoryType(category, slug) {
    return axios.get(`${API_URL}/download/${category}/${slug}`, {
      headers: authHeader(),
      responseType: 'blob'
    }).then((res) => {
      return res.data;
    });
  }
  
  static removeCategoryType(category, type){
    return axios.delete(`${API_URL}/${category}/${type}`, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  }
}

export default AdminService;
