import axios from 'axios';

const API_URL = 'https://reqres.in/api/users';

export const apiService = {
  async fetchUsers(page: string) {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data.data;
  },

  async fetchUserById(id: string) {
    console.log(id);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  async createUser(name: string, job: string) {
    const response = await axios.post(API_URL, { name, job });
    return response.data;
  },

  async updateUser(id: string, name: string, job: string) {
    const response = await axios.put(`${API_URL}/${id}`, { name, job });
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204;
  },
};
