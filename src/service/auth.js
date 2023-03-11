import axios from 'axios';

export default {
  login(code) {
    return axios.post('http://localhost:3001/login', { code }).then((res) => res.data);
  },
  refreshAccessToken(refresh_token) {
    return axios.post('http://localhost:3001/refresh', refresh_token).then((res) => res.data);
  },
};
