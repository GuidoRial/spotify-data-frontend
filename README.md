https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations

# Spotify Data Analysis

## TODO

1. Export example data as JSON so that we don't have to call the API so much, especially for longer queries like comparing artists audio features

## Functionality

- Get Track's Audio Features, show it using graphs [MVP]

  - Individual song [DONE]
    - Danceability, Energy, Valence, Instrumentalness, Loudness, Mode [DONE]
  - Album, compare each song [DONE]
    - Also, get average as an extra graph [DONE]
      - Danceability, Energy, Valence, Instrumentalness, Loudness, Mode

<!-- - Sentiment Analysis [MVP]

  - Individual song analysis to see if it has a possitive or negative sentiment [DONE]
  - Album analysis, to see the individual song and album average. [DONE]
    - We could also calculate the saddest and happiest song for an album [DONE]
  - Artist analysis [Maybe post MVP because it'd take too long]

    - Global average
    - Get saddest and happiest album
    - Album sentiment data

  - In each one we could call Get Track's Audio Features and return valence [DONE]
    - Therefore, we could actually compare the two -->

- Compare artist to each other [MVP]

  1. Get an artist through user Input - searchArtist [DONE]
  2. Get related artists - Get Artist's Related Artists [DONE]
  3. Get the top 10 songs from each of those artist - Get Artist's Top Tracks [DONE]
  4. How do those compare? How are those artist related? Do they make the same kind of music? Get Tracks' Audio Features [DONE]
  5. Graph it

- Easily create playlist [MVP]

  - Hidden Gems
    - User input =>
      - artists
      - Danceability, valence, energy, loudness, etc
      1. Get related artist to the artist the user inputted
      2. Filter by user params
      3. Get bottom 40% of songs filtered by popularity
      4. Make a playlist called "username Hidden Gems"
  - Same thing but with popular songs

- Most reppeated word within an artist

  - Get top 30 songs - What do these songs say that make them the most famous?
  - Get lyrics for all of those songs
  - Calculate the most common words
  - Word cloud

  1. Get Artist's Albums
  2. Get Several Albums => push ids to an array, get array length
  3. Get Several Tracks (50 at a time)
  4. Sort by popularity
  5. Get top 50
  6. Get lyrics
  7. Calculate most common words, return

- Reproduce music [DONE]

  - Ability to reproduce songs that we search for

- Auth [MVP]

  - Setup country, store user data in cookies or localStorage for each session

- Useful links <br /> https://developer.spotify.com/documentation/web-playback-sdk/guide/#running-everything-together https://developer.spotify.com/documentation/web-playback-sdk/reference/ https://github.com/spotify/spotify-web-playback-sdk-example/blob/main/src/WebPlayback.jsx https://www.highcharts.com/demo https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-analysis ????
