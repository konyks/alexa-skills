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

// Food intent function
var foodIntentFunction = function (req, res) {
    var foodName = req.slot('FOODNAME');

    var reprompt = 'Tell me a food name to get nutrition information.';

    if (_.isEmpty(foodName)) {
        var prompt = 'I didn\`t hear a food name.';

        res.say(prompt).reprompt(reprompt).shouldEndSession(false);

        return true;
    } else {
        var nutritionHelper = new NutritionDataHelper();

        nutritionHelper.requestNutritionData(foodName).then(function (foodData) {
            var data = nutritionHelper.formatNutritionData(foodData);

            console.log(data);

            res.say(data).send();
        }).catch(function (err) {
            console.log(err.statusCode);

            var prompt = 'I didn\'t have data for ' + foodName;

            res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
        });

        return false;
    }
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helpIntentFunction);

app.intent('FoodInfo', {
    'slots': {
        'FOODNAME': 'LITERAL'
    },
    'utterances': ['{Food is|Facts for|Food facts for|Calories for} {apple|fish|chicken|orange|FOODNAME}']
}, foodIntentFunction);

module.exports = app;