import axios from 'axios';

export default {
  login(code) {
    return axios.post('http://localhost:3001/login', { code }).then((res) => res.data);
  },
};
