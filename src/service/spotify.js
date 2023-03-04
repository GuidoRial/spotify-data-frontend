import axios from './api';

export default {
  getSongsOptionsByName(q) {
    return axios.get(`http://localhost:3001/spotify/search/song?q=${q}`).then((res) => res.data);
  },
  getTrackAudioFeatures(id) {
    return axios.get(`http://localhost:3001/spotify/audio-features/track/${id}`).then((res) => res.data);
  },
  getAlbumAudioFeatures(id) {
    return axios.get(`http://localhost:3001/spotify/audio-features/album/${id}`).then((res) => res.data);
  },
  getAlbumAudioFeatures(id) {
    return axios.get(`http://localhost:3001/spotify/compare-artist-to-related-artists/${id}`).then((res) => res.data);
  },
};
