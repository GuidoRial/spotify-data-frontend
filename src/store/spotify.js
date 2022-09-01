import axios from "axios";
import { defineStore } from "pinia";
import sentimentAnalysis from "../service/sentimentAnalysis";

const spotifyStore = defineStore("spotifyStore", {
  state: () => {
    return {
      optionsObject: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      },
      loading: false,
      // add at the end
    };
  },
  actions: {
    async getTrackAudioFeatures(songId) {
      try {
        let result = await axios.get(
          `https://api.spotify.com/v1/audio-features/${songId}`,
          this.optionsObject
        );
        return result.data;
      } catch (e) {
        throw e;
      }
    },
    async getTracksAudioFeatures(songsIds) {
      try {
        let result = await axios.get(
          `https://api.spotify.com/v1/audio-features?ids=${songsIds}`,
          this.optionsObject
        );
        return result.data;
      } catch (e) {
        throw e;
      }
    },

    async searchForAlbum(q) {
      // Return a list of options for the user to choose, then get the albumId when they clicks on it
      try {
        let res = await axios.get(
          `https://api.spotify.com/v1/search?type=album&q=${q}`,
          this.optionsObject
        );
        let albumsOptions = res.data.albums.items;
        return albumsOptions;
      } catch (e) {
        throw e;
      }
    },

    async getAlbumAudioFeatures(albumId) {
      // replace with getTracksAudioFeatures
      try {
        let res = await this.getAlbumById(albumId);

        // Get every song id into this array
        let songsIdArray = [];
        let songsArray = res.tracks.items;

        for (let song of songsArray) {
          songsIdArray.push(song.id);
        }

        // Convert that array into a set of string like "id,id,id" instead of ["id", "id", "id"]
        // Use that string to get all the audio features

        let response = await this.getTracksAudioFeatures(
          songsIdArray.join(",")
        );

        let albumAudioFeatures = response.audio_features;

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
    async getSongSentimentAnalysis(song, language) {
      try {
        let response = await sentimentAnalysis.getSentimentAnalysis(
          song,
          language
        );

        return response;
      } catch (e) {
        throw e;
      }
    },
    async getAlbumById(albumId) {
      try {
        let res = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}`,
          this.optionsObject
        );
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async getAlbumSentimentAnalysis(albumId, language) {
      try {
        let album = await this.getAlbumById(albumId);
        let albumTracks = album.tracks.items;

        let sentimentAnalysisData = [];

        for (let i = 0; i < albumTracks.length; i++) {
          const song = {
            id: albumTracks[i].id,
            artist: album.artists[0].name,
            track: albumTracks[i].name,
          };

          let response = await sentimentAnalysis.getSentimentAnalysis(
            song,
            language
          );

          sentimentAnalysisData.push({ response, song });
        }

        let albumSentimentAverage = 0;

        for (let song of sentimentAnalysisData) {
          albumSentimentAverage += song.response.songSentimentAnalysis;
        }

        albumSentimentAverage =
          albumSentimentAverage / sentimentAnalysisData.length;

        return {
          artist: album.artists[0].name,
          album: album.name,
          albumSentimentAverage,
          sentimentAnalysisData,
        };
      } catch (e) {
        throw e;
      }
    },
    async getAlbumSentimentAnalysisAndAudioFeatures(albumId, language) {
      try {
        let albumSentimentAnalysis = await this.getAlbumSentimentAnalysis(
          albumId,
          language
        );

        let albumAudioFeatures = await this.getAlbumAudioFeatures(albumId);

        return { albumAudioFeatures, albumSentimentAnalysis };
      } catch (e) {
        throw e;
      }
    },
    async searchForArtist(q) {
      // Return a list of options for the user to choose, then get the artistId when they clicks on it
      //"6XyY86QOPPrYVGvF9ch6wz" - Linkin Park
      try {
        let res = await axios.get(
          `https://api.spotify.com/v1/search?type=artist&q=${q}`,
          this.optionsObject
        );
        let artistOptions = res.data.artists.items;

        return artistOptions;
      } catch (e) {
        throw e;
      }
    },
    async getArtistRelatedArtist(artistId) {
      try {
        let res = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          this.optionsObject
        );
        let relatedArtists = res.data.artists;
        return relatedArtists;
      } catch (e) {
        throw e;
      }
    },
    async getArtistTopTracks(artistId, country) {
      try {
        let res = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`,
          this.optionsObject
        );

        let topTracks = res.data;
        return topTracks;
      } catch (e) {
        throw e;
      }
    },
    async compareArtistWithItsRelatedArtists(artistId, country) {
      try {
        // Get primary artist data
        let res = await this.getArtistTopTracks(artistId, country);
        let primaryArtistTopTracks = res.tracks;
        let primaryArtistTopTracksIds = [];

        for (let track of primaryArtistTopTracks) {
          primaryArtistTopTracksIds.push(track.id);
        }

        let primaryArtistAudioFeatures = await this.getTracksAudioFeatures(
          primaryArtistTopTracksIds.join(",")
        );

        let primaryArtistData = {
          primaryArtistTopTracks,
          primaryArtistAudioFeatures,
        };

        // Get primary artist data

        // Get related artists data
        let relatedArtists = await this.getArtistRelatedArtist(artistId);

        let relatedArtistsIds = [];

        for (let track of relatedArtists) {
          relatedArtistsIds.push(track.id);
        }
        console.log("loading...");
        let relatedArtistsData = {};

        for (let i = 0; i < relatedArtistsIds.length; i++) {
          let response = await this.getArtistTopTracks(
            relatedArtistsIds[i],
            country
          );
          let artistTopTracks = response.tracks;
          let artistName = artistTopTracks[0].artists[0].name;

          let tracksIds = [];

          for (let track of artistTopTracks) {
            tracksIds.push(track.id);
          }

          let res = await this.getTracksAudioFeatures(tracksIds.join(","));

          let artistTopTracksAudioFeatures = res.audio_features;

          relatedArtistsData[artistName] = {
            artistTopTracks,
            artistTopTracksAudioFeatures,
          };
        }

        console.log("done...");

        return { primaryArtistData, relatedArtistsData };
        // Get related artists data
      } catch (e) {
        throw e;
      }
    },
    async getCurrentUsersProfile() {
      try {
        let res = await axios.get(
          "https://api.spotify.com/v1/me",
          this.optionsObject
        );
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async getCurrentUsersTopArtists() {
      try {
        let res = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          this.optionsObject
        );
        return res.data;
      } catch (e) {
        throw e;
      }
    },
  },
});

export default spotifyStore;
