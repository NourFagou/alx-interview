#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.hbtn.io/api';

if (process.argv.length > 2) {
  const movieId = process.argv[2];

  request(`${API_URL}/films/${movieId}/`, (err, _, body) => {
    if (err) {
      console.error('Error fetching movie data:', err.message);
      process.exit(1);
    }

    try {
      const charactersURL = JSON.parse(body).characters;

      const charactersName = charactersURL.map(
        url => new Promise((resolve, reject) => {
          request(url, (promiseErr, __, charactersReqBody) => {
            if (promiseErr) {
              reject(promiseErr);
            }
            resolve(JSON.parse(charactersReqBody).name);
          });
        })
      );

      Promise.all(charactersName)
        .then(names => console.log(names.join('\n')))
        .catch(allErr => {
          console.error('Error fetching character names:', allErr.message);
          process.exit(1);
        });
    } catch (parseError) {
      console.error('Error parsing movie data:', parseError.message);
      process.exit(1);
    }
  });
} else {
  console.error('Usage: ./0-starwars_characters.js <movie_id>');
  process.exit(1);
}
