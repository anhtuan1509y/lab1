const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000

const publicDirectorPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const particalPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(particalPath);

app.use(express.static(publicDirectorPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude,(error, data) => {
            if(error) {
                return res.send({error})
            }
            return res.send({
                forecast: data,
                location,
                address: req.query.address
            })           
        })
    })
})


app.listen(port, () => console.log('Running'))