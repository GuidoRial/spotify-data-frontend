import axios from "axios";

export default {
  getTracksAudioFeatures(id) {
    return axios
      .get(`http://localhost:3001/spotify/audio-features/${id}`)
      .then((res) => res.data);
  },
  getAlbumAudioFeatures() {},
};
