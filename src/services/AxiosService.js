import axios from 'axios';

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer dsfghdsfhgfdhfdgh`
  }
});

export default {
  getEvents(url, key) {
    console.log(url, key);
    return apiClient.get('/events');
  }
};
