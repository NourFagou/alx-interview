#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <movie_id>');
  process.exit(1);
}

const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Error: ${response.statusCode}`);
    process.exit(1);
  }

  const filmData = JSON.parse(body);
  const characters = filmData.characters;

  const fetchCharactersSequentially = async () => {
    try {
      for (const url of characters) {
        await new Promise((resolve, reject) => {
          request(url, (err, res, charBody) => {
            if (err) reject(err);
            resolve(JSON.parse(charBody).name);
          });
        });
      }
      console.log('OK'); // Print OK if all characters are fetched
    } catch (err) {
      console.error(err);
    }
  };

  fetchCharactersSequentially();
});
