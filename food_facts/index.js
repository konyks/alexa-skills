'use strict';

module.change_code = 1;

var alexa = require('alexa-app');

var app = new alexa.app('foodfacts');

// Launch intent function
var launchIntentFunction = function(req, res){
    var prompt = 'Greeting to you! Tell me a name of food?';
    res.say(prompt).shouldEndSession(false);
};

// Help intent function
var helpIntentFunction = function(req, res){
    var help = 'To start tell me the food you would like to know nutrition facts about? You can also say stop or cancel to exit.';
    res.say(help).shouldEndSession(false);
};

// Cancel intent function
var cancelIntentFunction = function(req, res) {
  res.say('Goodbye! Eath health!').shouldEndSession(true);
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helpIntentFunction);

//TODO: create food name intent

module.exports = app;