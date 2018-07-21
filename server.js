const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log' , log + '\n');
    next();
});

// app.use((req, res, next) => {
//     return  res.render('maintaince.hbs');
// });

hbs.registerHelper('getCurrentYear' , () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
});

app.get('/' , (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs' , {
        pageTitle : 'Home Page' ,
        welcomeMessage : 'Welcome to the Home Page'
        // currentYear : new Date().getFullYear()
    });
});

app.get('/about' , (req, res) => {
    // res.send({
    //     name : 'Aman',
    //     Hobbies : ['Biking' , 'Cities']
    // });
    res.render('about.hbs' , {
        pageTitle : 'About Page'
        //currentYear : new Date().getFullYear()
    });
});

app.get('/bad' , (req, res) => {
    res.send({
        errorMessage : 'Unable to fullfill this request'
    });
});

app.listen(port , () => {
    console.log(`Server is up on port ${port}`)
});