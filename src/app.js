const express = require('express')
const path = require('path')
const hbs = require('hbs')
const mapBox = require('./utils/mapBox')
const forecast = require('./utils/foreCast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const veiwsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', veiwsPath)  //custom directory for views
hbs.registerPartials(partialsPath)

//Set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{   //has to match up with file in veiw folder
        title : 'Weather App',
        name : 'Supanut'
    })  
})

app.get('/about',(req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Supanut'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is some helpful text.',
        title : 'Help',
        name : 'Supanut'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error : "You must provide a address term"
        })
    }
    mapBox(req.query.address, (error, {latitude, longitude, location} = {}) => { //using destructuring and set it to default because if error occur second parameter would not be called
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, ( error, foreCastData) => {
            if(error){
                return res.send({error})
            } 
            res.send({
                forecast : foreCastData,
                location : location,
                address : req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    //cant use res.send twice 
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
        console.log(req.query.search)
        return res.send({
            products : []
        })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Supanut',
        errerMsg : 'Help articale not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Supanut',
        errerMsg : 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})