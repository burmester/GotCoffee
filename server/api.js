var http = require('http'),
    express = require('express'),
    _ = require('underscore');

var app = express();

var weightAtTime = [
    {
        "time": "2015-05-17T18:21:40.187Z",
        "weight": 1500
    },
    {
        "time": "2015-05-17T18:22:40.187Z",
        "weight": 1400
    }
];

app.use('/vendor', express.static('../bower_components'));
app.use(express.static('../client/'));

app.get('/currentWeight', function (req, res) {
    res.status(200).send({'temp': getRandomInt(0, 1500)});
});

app.get('/weights/:time', function (req, res) {
    res.status(200).send(_.findWhere(weightAtTime, {"time": req.params.time}));
});

app.get('/weights', function (req, res) {
    res.status(200).send(weightAtTime);
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
