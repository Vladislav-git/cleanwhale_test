import axios from "axios";

const API_URL = "http://localhost:3333/auth";

const api = {
  login: async (email: string, password: string) => {
    const response = await axios.post(API_URL + '/local/signin', { email, password });
    return response.data;
  },
  
  signup: async (email: string, password: string) => {
    const response = await axios.post(API_URL + '/local/signup', { email, password });
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('access');
    const response = await axios.post(API_URL + '/logout', {}, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  },
  
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh');
    const response = await axios.post(API_URL + '/refresh', {}, {headers: {Authorization: `Bearer ${refreshToken}`}});
    return response.data;
  },
};

export default api;
