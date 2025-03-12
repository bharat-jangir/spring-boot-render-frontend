import axios from 'axios';

const API_BASE_URL = 'https://spring-boot-render-rq5c.onrender.com/api/tempmail';
// const API_BASE_URL = 'http://localhost:8080/api/tempmail';

const api = {
  generateEmail: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate email');
    }
  },

  getEmails: async (emailAddress) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/emails/${emailAddress}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch emails');
    }
  },

  sendEmail: async (emailData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/receive`, emailData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send email');
    }
  }
};

export default api; 