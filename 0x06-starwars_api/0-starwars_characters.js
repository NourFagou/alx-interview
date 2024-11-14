#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

// Check if movieId is provided
if (!movieId) {
  console.error("Please provide a Movie ID.");
  process.exit(1);
}

// Make a request to get the movie details
request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  try {
    const movie = JSON.parse(body);
    const characters = movie.characters;

    // For each character URL, make a request to get the character's name
    characters.forEach((characterUrl) => {
      request(characterUrl, (error, response, body) => {
        if (error) {
          console.error(error);
          return;
        }
        const character = JSON.parse(body);
        console.log(character.name);
      });
    });
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});
