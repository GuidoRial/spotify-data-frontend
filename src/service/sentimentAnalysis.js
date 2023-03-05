import axios from 'axios';

export default {
  getSentimentAnalysis(song, language) {
    return axios
      .get(`http://localhost:3001/sentiment-analysis?artist=${song.artist}&track=${song.track}&language=${language}`)
      .then((res) => res.data);
  },
};
