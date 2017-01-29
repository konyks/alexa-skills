'use strict';

module.change_code = 1;

var alexa = require('alexa-app');

var app = new alexa.app('synonymizer');

// Launch intent function
var launchIntentFunction = function(req, res){
    var prompt = 'Greeting to you! What word would you like to get synonymies for?';
    res.say(prompt).shouldEndSession(false);
};

// Help intent function
var helpIntentFunction = function(req, res){
    var help = 'To start tell me the word that you would like to find synonymies for? You can also say stop or cancel to exit.';
    res.say(help).shouldEndSession(false);
};

// Cancel intent function
var cancelIntentFunction = function(req, res) {
  res.say('Goodbye! Hope to talk to you again!').shouldEndSession(true);
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helpIntentFunction);

app.intent('WordIntent', {
    'slots':{'WORD':'LITERAL'}
    ,'utterances':['{The world is} {apple|orange|car|boat|happy}']
},function(req,res){
    res.say('Synonymies for '+ req.slot('WORD')+' '); //TODO: call api to get the synonymies
});

module.exports = app;