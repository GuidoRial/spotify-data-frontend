import axios from './api';

const BASE_URL = 'http://localhost:3001/spotify';

export default {
  getSongsOptionsByName(q) {
    return axios.get(`${BASE_URL}/search/song?q=${q}`).then((res) => res.data);
  },
  getTrackAudioFeatures(id) {
    return axios.get(`${BASE_URL}/audio-features/track/${id}`).then((res) => res.data);
  },
  getAlbumAudioFeatures(id) {
    return axios.get(`${BASE_URL}/audio-features/album/${id}`).then((res) => res.data);
  },
  getAlbumAudioFeatures(id) {
    return axios.get(`${BASE_URL}/compare-artist-to-related-artists/${id}`).then((res) => res.data);
  },
  handlePlayer({ action, uri }) {
    return axios.post(`${BASE_URL}/me/player`, { action, uri });
  },
};
