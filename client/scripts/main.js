define(function (require) {
    var $ = jQuery = require('jquery'),
        _ = require('underscore'),
        less = require('less');

    $(document).ready(function () {

        url = document.URL + 'currentWeight';
        $.getJSON(url, function (data) {
            $('.currentWeight').append("<p> Nuvarande vikt: " + data.weight + "gram</p>");
        });
    });
});