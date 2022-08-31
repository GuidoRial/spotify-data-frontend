import { defineStore } from "pinia";

const spotifyStore = defineStore("auth", {
  state: () => {
    return {};
  },
  actions: {
    // Maybe here it should be something like
    // getAlbumMostSadSong or getAlbumSpectrum
    // or getArtistMostAmbivalentAlbum? 
    // then this goes to the backend, gets analyzed and returns data here
    // Albums
    async getAlbum(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getSeveralAlbums(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    // Albums

    // Artists
    async getArtist(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getSeveralArtists(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getArtistsAlbums(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getArtistsRelatedArtists(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getArtistsTopTracks() {
      try {
      } catch (e) {
        throw e;
      }
    },
    // Artists

    // Tracks
    async getTrack() {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getSeveralTracks() {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getSeveralTracksAudioFeatures() {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getTracksAudioFeatures() {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getSeveralTracksAudioAnalysis(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getTracksAudioFeatures(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getRecommendations(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    // Tracks

    // User
    async getProfileData(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    // User

    // Playlist
    async getCurrentUsersPlaylists(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async createPlaylist(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
    async getCategoryPlaylist(accessToken) {
      try {
      } catch (e) {
        throw e;
      }
    },
  },
});

export default spotifyStore;
