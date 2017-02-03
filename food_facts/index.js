'use strict';

module.change_code = 1;

var _ = require('lodash');

var alexa = require('alexa-app');

var app = new alexa.app('foodfacts');

var NutritionDataHelper = require('./nutrition_data_helper');

// Launch intent function
var launchIntentFunction = function (req, res) {
    var prompt = 'Greeting to you! Tell me a name of food?';
    res.say(prompt).shouldEndSession(false);
};

// Help intent function
var helpIntentFunction = function (req, res) {
    var help = 'To start tell me the food you would like to know nutrition facts about? You can also say stop or cancel to exit.';
    res.say(help).shouldEndSession(false);
};

// Cancel intent function
var cancelIntentFunction = function (req, res) {
    res.say('Goodbye! Eath healthy!').shouldEndSession(true);
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helpIntentFunction);

app.intent('FoodInfo', {
        'slots': {
            'FOODNAME': 'LITERAL'
        },
        'utterances': ['{Food is} {apple|fish|pineapple|FOODNAME}']
    },
    function (req, res) {
        var nutritionHelper = new NutritionDataHelper();
        nutritionHelper.requestNutritionData(req.slot('FOODNAME')).then(function (foodData) {

            //TODO: add some re prompt logic

            var data = nutritionHelper.formatNutritionData(foodData);
            console.log(data);
            res.say(data).shouldEndSession(false).send();
        }).catch(function (err) {
            console.log(err.statusCode);
        });
    }
);

module.exports = app;