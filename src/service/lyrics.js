import axios from 'axios';

export default {
  getLyrics(song) {
    return axios.get(`http://localhost:3001/lyrics?artist=${song.artist}&track=${song.track}`).then((res) => res.data);
  },
};
