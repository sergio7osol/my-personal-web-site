const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('base', '/');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get("/", (req, res) => {
    res.render('home.hbs', {
        pageTitle: "My personal web-site",
        pageMainTitle: "Welcome to my personal web-site!"
    });
});

app.get("/portfolio", (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: "Portfolio Page",
        pageMainTitle: "My works"
    });
});
app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to fullfill the request."
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});