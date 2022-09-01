https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations

# Spotify Data Analysis


## TODO
1. Export example data as JSON so that we don't have to call the API so much, especially for longer queries like comparing artists audio features
## Functionality

- Get Track's Audio Features, show it using graphs [MVP]

  - Individual song [DONE]
  - Album, compare each song [DONE]
    - Also, get average as an extra graph [DONE]
      - Danceability, Energy, Valence, Instrumentalness, Loudness, Tempo

- Sentiment Analysis [MVP]

  - Individual song analysis to see if it has a possitive or negative sentiment [DONE]
  - Album analysis, to see the individual song and album average. [DONE]
    - We could also calculate the saddest and happiest song for an album [DONE]
  - Artist analysis [Maybe post MVP because it'd take too long]

    - Global average
    - Get saddest and happiest album
    - Album sentiment data

  - In each one we could call Get Track's Audio Features and return valence [DONE]
    - Therefore, we could actually compare the two

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
  - Get top 50 songs
  - Get lyrics for all of those songs
  - Calculate the most common words
  - Word cloud
