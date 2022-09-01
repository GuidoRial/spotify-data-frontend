import axios from "axios";

export default {
  getMostCommonWords(songs) {
    return axios
      .get(
        `http://localhost:3001/most-common-words?songs=${songs}`
      )
      .then((res) => res.data);
  },
};
