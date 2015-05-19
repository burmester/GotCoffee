var require = require('requirejs'),
    http = require('http'),
    express = require('express'),
    database = require('../server/database'),
    cronJob = require('cron').CronJob,
    _ = require('underscore');

var app = express(),
    job = new cronJob({
        cronTime: "* * * * * *",
        onTick: function () {
            database.create(getRandomInt(0, 1500));
        },
        start: false
    });

app.use('/vendor', express.static('../bower_components'));
app.use(express.static('../client/'));

app.get('/currentWeight', function (req, res) {
    database.create(getRandomInt(0, 1500), function (error, weight) {
        res.status(200).send(weight);
    });
});

app.get('/weights/:date', function (req, res) {
    database.find({"date": new Date(req.params.date)}, function (error, weights) {
        res.status(200).send(weights);
    });
});

app.get('/weights', function (req, res) {
    res.status(200).send("soon");
});

app.get('*', function (req, res) {
    res.status(404).send('Unrecognised API call');
});

app.use(function (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


app.listen(3000);
console.log('App Server is listening on port 3000');

console.log("test");
