import axios from "axios";

export default {
  getSentimentAnalysis(song) {
    return axios
      .get(
        `http://localhost:3001/sentiment-analysis?artist=${song.artist}&track=${song.track}`
      )
      .then((res) => res.data);
  },
};
