const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = express.static(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(publicDirectoryPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vanderson Assis'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the message!! =}',
    title: 'Help',
    name: 'Vanderson Assis'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vanderson Assis'
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Snow!!! Yuppppyyyy! =}',
    location: 'Calgary'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404',  {
    title: '404',
    name: 'Vanderson Assis',
    errorMessage: 'The help article requested could not be found'
  });
});

// Anything that hasn't been matched so far. Or else, 404 default page
// This route has to be the last on the code, anything bellow it will not be considered, since this is a match for everything 
// and express fetches the route from top down...meaning if this is above any other route, then that (or those)route bellow it
// will not be considere
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Vanderson Assis',
    errorMessage: 'The page requested could not be found'
  });  
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});