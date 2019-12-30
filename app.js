const express = require('express');
const morgan = require('morgan');
const apps = require('./appData.js')

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;

    //if there is a genres query param...
    if (genres) {
        //confused by this 
        if (!['Action', 'Puzzle','Strategy','Casual','Arcade','Card'].includes(genres)) {
          return res
            .status(400)
            .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card.');
        }
      }

    //if there is a sort query param...
    if (sort) {
        //confused by this 
        if (!['app', 'rating'].includes(sort)) {
            return res
            .status(400)
            .send('Sort must be either rating or app.');
        }
        }

    //filter apps by genre type
    let results = apps 
        .filter(app => 
            app
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase()))
    
    //if there is sort... not working
    if (sort) {
        results
            .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
        }
    
    //return results as JSON
    res
      .json(results);
});

app.listen(8001, () => {
  console.log('Server started on PORT 8001');
});