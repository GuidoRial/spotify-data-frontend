import axios from "axios";
import { defineStore } from "pinia";
import sentimentAnalysis from "../service/sentimentAnalysis";

const spotifyStore = defineStore("spotifyStore", {
  state: () => {
    return {};
  },
  actions: {
    // Get track's audio features
    async getTrackAudioFeatures(songId, access_token) {
      try {
        let result = await axios.get(
          `https://api.spotify.com/v1/audio-features/${songId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return result.data;
      } catch (e) {
        throw e;
      }
    },
    async getAlbumAudioFeatures(albumId, access_token) {
      let optionsObject = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try {
        // Get album by id
        let res = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}`,
          optionsObject
        );

        // Get every song id into this array
        let songsIdArray = [];
        let songsArray = res.data.tracks.items;

        for (let song of songsArray) {
          songsIdArray.push(song.id);
        }

        // Convert that array into a set of string like "id,id,id" instead of ["id", "id", "id"]
        // Use that string to get all the audio features
        let response = await axios.get(
          `https://api.spotify.com/v1/audio-features?ids=${songsIdArray.join(
            ","
          )}`,
          optionsObject
        );

        let albumAudioFeatures = response.data.audio_features;

        // Add every interesting value to get the average later
        let averageAudioFeatures = {
          // We said we'd use Danceability, Energy, Valence, Instrumentalness, Loudness, Tempo
          // But while we're here I might as well
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          liveness: 0,
          loudness: 0,
          speechiness: 0,
          tempo: 0,
          valence: 0,
        };

        for (let i = 0; i < albumAudioFeatures.length; i++) {
          // They seem to mantain their order so let just do this...
          if (albumAudioFeatures[i].id !== songsArray[i].id) {
            console.log("not the same id!!!");
            throw new Error("Albums dont mantain id");
          }
          // Given that we'll display albumAudioFeatures as a graph, we need a way to get
          // The artists, name, and song links
          albumAudioFeatures[i].artists = songsArray[i].artists;
          albumAudioFeatures[i].external_urls = songsArray[i].external_urls;
          albumAudioFeatures[i].name = songsArray[i].name;
          albumAudioFeatures[i].uri = songsArray[i].uri;

          // Add every usefull information to the averageAudioFeatures object
          // After the end of the loop we'll get the average
          averageAudioFeatures.acousticness +=
            albumAudioFeatures[i].acousticness;
          averageAudioFeatures.danceability +=
            albumAudioFeatures[i].danceability;
          averageAudioFeatures.energy += albumAudioFeatures[i].energy;
          averageAudioFeatures.instrumentalness +=
            albumAudioFeatures[i].instrumentalness;
          averageAudioFeatures.liveness += albumAudioFeatures[i].liveness;
          averageAudioFeatures.loudness += albumAudioFeatures[i].loudness;
          averageAudioFeatures.speechiness += albumAudioFeatures[i].speechiness;
          averageAudioFeatures.tempo += albumAudioFeatures[i].tempo;
          averageAudioFeatures.valence += albumAudioFeatures[i].valence;
        }

        for (const key of Object.keys(averageAudioFeatures)) {
          averageAudioFeatures[key] =
            averageAudioFeatures[key] / albumAudioFeatures.length;
        }

        return { averageAudioFeatures, albumAudioFeatures };
      } catch (e) {
        throw e;
      }
    },
    async getSongSentimentAnalysis(song) {
      try {
        let response = await sentimentAnalysis.getSentimentAnalysis(song);

        return response;
      } catch (e) {
        throw e;
      }
    },
  },
});

export default spotifyStore;
