const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths to Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tom Ben Aroya'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tom Ben Aroya'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is a help message',
        title: 'Help',
        name: 'Tom Ben Aroya'
    });
});

app.get('/weather', (req, res) => {
    const adress = req.query.adress;

    if (!adress) {
        return res.send({
            error: 'You must provide an adress'
        });
    }

    geocode(adress, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
    
            res.send({
                forecast: forecastData,
                location,
                adress: adress
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search); 
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tom Ben Aroya',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tom Ben Aroya',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.'); 
});