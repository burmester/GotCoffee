define(function (require) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/gotcoffee');

    var Weight = mongoose.model('Weight', new mongoose.Schema({
        date: Date,
        weight: Number
    }));

    return {
        create: function (weight, callback) {
            Weight.create({weight: weight, date: new Date()}, callback);
        },
        find: function (conditions, callback) {
            console.log(conditions);
            Weight.find(conditions, callback);
        },
        remove: function (conditions, callback) {
            Weight.remove(conditions, callback);
        }
    }
});