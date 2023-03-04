import axios from 'axios';
import { defineStore } from 'pinia';
import sentimentAnalysis from '../service/sentimentAnalysis';
import mostCommonWords from '../service/mostCommonWords';
import spotify from '@/service/spotify';

const spotifyStore = defineStore('spotifyStore', {
  state: () => {
    return {
      loading: false,
    };
  },
  actions: {
    async searchForSong(q) {
      try {
        const tracks = await spotify.getSongsOptionsByName(q);
        console.log(tracks);
        return tracks;
      } catch (e) {
        throw e;
      }
    },
    async getTrackAudioFeatures(id) {
      try {
        this.loading = true;
        const data = await spotify.getTrackAudioFeatures(id);
        this.loading = false;
        console.log(data);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async getTracksAudioFeatures(songsIds) {
      try {
        let result = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${songsIds}`);
        return result.data;
      } catch (e) {
        throw e;
      }
    },

    async searchForAlbum(q) {
      // Return a list of options for the user to choose, then get the albumId when they clicks on it
      try {
        let res = await axios.get(`https://api.spotify.com/v1/search?type=album&q=${q}`);
        let result = res.data.albums.items;

        let albumOptions = result.map((album) => {
          return {
            artist_name: album.artists[0].name,
            album_id: album.id,
            album_image: album.images[0].url,
            album_name: album.name,
            album_uri: album.uri,
            release_date: album.release_date,
            release_date_precision: album.release_date_precision,
          };
        });
        localStorage.setItem('album-options', JSON.stringify(albumOptions));
        return albumOptions;
      } catch (e) {
        throw e;
      }
    },

    async getAlbumAudioFeatures(albumId) {
      // replace with getTracksAudioFeatures
      try {
        this.loading = true;
        let res = await this.getAlbumById(albumId);

        // Get every song id into this array
        let songsIdArray = [];
        let songsArray = res.tracks.items;

        for (let song of songsArray) {
          songsIdArray.push(song.id);
        }

        // Convert that array into a set of string like "id,id,id" instead of ["id", "id", "id"]
        // Use that string to get all the audio features

        let response = await this.getTracksAudioFeatures(songsIdArray.join(','));

        let albumAudioFeatures = response.audio_features;

        // // Add every interesting value to get the average later
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
            console.log('not the same id!!!');
            throw new Error('Albums dont mantain id');
          }
          // Given that we'll display albumAudioFeatures as a graph, we need a way to get
          // The artists, name, and song links
          albumAudioFeatures[i].artist_name = songsArray[i].artists[0].name;
          albumAudioFeatures[i].song_name = songsArray[i].name;
          albumAudioFeatures[i].song_uri = songsArray[i].uri;
          albumAudioFeatures[i].song_id = songsArray[i].id;

          averageAudioFeatures.acousticness += albumAudioFeatures[i].acousticness;
          averageAudioFeatures.danceability += albumAudioFeatures[i].danceability;
          averageAudioFeatures.energy += albumAudioFeatures[i].energy;
          averageAudioFeatures.instrumentalness += albumAudioFeatures[i].instrumentalness;
          averageAudioFeatures.liveness += albumAudioFeatures[i].liveness;
          averageAudioFeatures.loudness += albumAudioFeatures[i].loudness;
          averageAudioFeatures.speechiness += albumAudioFeatures[i].speechiness;
          averageAudioFeatures.tempo += albumAudioFeatures[i].tempo;
          averageAudioFeatures.valence += albumAudioFeatures[i].valence;
        }

        for (const key of Object.keys(averageAudioFeatures)) {
          averageAudioFeatures[key] = averageAudioFeatures[key] / albumAudioFeatures.length;
        }
        this.loading = false;
        return { averageAudioFeatures, albumAudioFeatures };
      } catch (e) {
        throw e;
      }
    },
    async getSongSentimentAnalysis(song, language) {
      try {
        let response = await sentimentAnalysis.getSentimentAnalysis(song, language);

        return response;
      } catch (e) {
        throw e;
      }
    },
    async getAlbumById(albumId) {
      try {
        let res = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`);
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

          let response = await sentimentAnalysis.getSentimentAnalysis(song, language);

          sentimentAnalysisData.push({ response, song });
        }

        let albumSentimentAverage = 0;

        for (let song of sentimentAnalysisData) {
          albumSentimentAverage += song.response.songSentimentAnalysis;
        }

        albumSentimentAverage = albumSentimentAverage / sentimentAnalysisData.length;

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
        let albumSentimentAnalysis = await this.getAlbumSentimentAnalysis(albumId, language);

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
        let res = await axios.get(`https://api.spotify.com/v1/search?type=artist&q=${q}`);
        let data = res.data.artists.items;
        let artistOptions = data.map((artist) => {
          return {
            artist_name: artist.name,
            artist_image: artist.images[0]?.url,
            artist_uri: artist.uri,
            artist_id: artist.id,
          };
        });
        return artistOptions;
      } catch (e) {
        throw e;
      }
    },
    async getArtistRelatedArtist(artistId) {
      try {
        let res = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`);
        let relatedArtists = res.data.artists;
        return relatedArtists;
      } catch (e) {
        throw e;
      }
    },
    async getArtistTopTracks(artistId, country) {
      try {
        let res = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`);

        let topTracks = res.data;
        return topTracks;
      } catch (e) {
        throw e;
      }
    },
    async compareArtistWithItsRelatedArtists(artistId, country) {
      try {
        this.loading = true;
        // Get primary artist data
        let res = await this.getArtistTopTracks(artistId, country);
        let primaryArtistTopTracks = res.tracks;
        let primaryArtistTopTracksIds = [];

        for (let track of primaryArtistTopTracks) {
          primaryArtistTopTracksIds.push(track.id);
        }
        let result = await this.getTracksAudioFeatures(primaryArtistTopTracksIds.join(','));
        let primaryArtistAudioFeatures = result.audio_features;

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
        let relatedArtistsData = {};

        for (let i = 0; i < relatedArtistsIds.length; i++) {
          let response = await this.getArtistTopTracks(relatedArtistsIds[i], country);
          let artistTopTracks = response.tracks;
          let artistName = artistTopTracks[0].artists[0].name;

          let tracksIds = [];

          for (let track of artistTopTracks) {
            tracksIds.push(track.id);
          }

          let res = await this.getTracksAudioFeatures(tracksIds.join(','));

          let artistTopTracksAudioFeatures = res.audio_features;

          relatedArtistsData[artistName] = {
            artistTopTracks,
            artistTopTracksAudioFeatures,
          };
        }

        this.loading = false;

        return { primaryArtistData, relatedArtistsData };
        // Get related artists data
      } catch (e) {
        throw e;
      }
    },
    async getCurrentUsersProfile() {
      try {
        let res = await axios.get('https://api.spotify.com/v1/me');
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async getCurrentUsersTopArtists() {
      try {
        let res = await axios.get('https://api.spotify.com/v1/me/top/tracks');
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async getArtistsAlbums(artistId) {
      // gets a list of albums
      try {
        let res = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=album`);
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async getSeveralAlbums(albumsIds) {
      // gets a list of albums
      try {
        let res = await axios.get(`https://api.spotify.com/v1/albums?ids=${albumsIds}`);
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async getSeveraltracks(tracksIds) {
      try {
        let res = await axios.get(`https://api.spotify.com/v1/tracks?ids=${tracksIds}`);
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async callFunctionPerChunks(chunkSize, cb, idsArray, albumsOrTracks) {
      const queue = [];
      let answer = [];
      for (let i = 0; i < idsArray.length; i += chunkSize) {
        const chunk = idsArray.slice(i, i + chunkSize);
        queue.push(chunk);
      }

      for (let i = 0; i < queue.length; i++) {
        let response = await cb(queue[i].join(','));
        answer = [...answer, ...response[albumsOrTracks]];
      }
      return answer;
    },
    async getMostReppeatedWordWithinAnArtist(artistId, language) {
      try {
        let res = await this.getArtistsAlbums(artistId);
        let artistAlbums = res.items;

        let albumsIds = [];

        for (let album of artistAlbums) {
          albumsIds.push(album.id);
        }

        let albums;
        if (albumsIds.length > 20) {
          albums = await this.callFunctionPerChunks(
            20, //max amount supported
            this.getSeveralAlbums,
            albumsIds,
            'albums'
          );
        } else {
          let data = await this.getSeveralAlbums(albumsIds.join(','));
          albums = data.albums;
        }

        let tracksIds = [];

        for (let album of albums) {
          let tracks = album.tracks.items;
          for (let track of tracks) {
            tracksIds.push(track.id);
          }
        }

        let tracks = await this.callFunctionPerChunks(50, this.getSeveraltracks, tracksIds, 'tracks');
        tracks.sort((a, b) => b.popularity - a.popularity);

        console.log('tracks regarding popularity');
        console.log(tracks);

        tracks.splice(40, tracks.length - 50);

        // for (let i = 0; i < tracks.length; i++) {
        //   // Delete not famous songs?
        //   if (tracks[i].popularity < 40) {
        //     tracks.splice(tracks[i], i);
        //     i--;
        //   }
        // }

        console.log('tracks with the most popularity');
        console.log(tracks);

        // let songsArray = [];

        // for (let i = 0; i < tracks.length; i++) {
        //   songsArray.push({
        //     artist: tracks[i].artists[0].name,
        //     track: tracks[i].name,
        //   });
        // }

        // console.log("loading");

        // let appearancesOfWords = {};
        // const queue = [];
        // for (let i = 0; i < songsArray.length; i += 10) {
        //   const chunk = songsArray.slice(i, i + 10);
        //   queue.push(chunk);
        // }

        // for (let i = 0; i < queue.length; i++) {
        //   let analizedWordsFromBackend =
        //     await mostCommonWords.getMostCommonWords(JSON.stringify(queue[i]));

        //   console.log(analizedWordsFromBackend);
        // for (let [key, value] of Object.entries(analizedWordsFromBackend)) {
        //   if (!appearancesOfWords[key]) {
        //     appearancesOfWords[key] = 0;
        //   } else {
        //     appearancesOfWords[key] += analizedWordsFromBackend[key];
        //   }
        // }
      } catch (e) {
        throw e;
      }
    },
  },
});

export default spotifyStore;
