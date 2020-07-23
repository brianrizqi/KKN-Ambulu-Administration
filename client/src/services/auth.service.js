import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

class AuthService {
  static login(username, password){
    return axios
      .post(`${API_URL}/auth/login`, {
        username: username,
        password: password
      })
      .then(response => {
        if(response.data.statusCode === 200){
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
      })
  }
  
  static logout(){
    localStorage.removeItem('user');
  }
}

export default AuthService;
