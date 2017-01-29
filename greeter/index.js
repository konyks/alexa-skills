'use strict';

module.change_code = 1;

var Greeter = require('./greeter');

var alexa = require('alexa-app');

var app = new alexa.app('greeter');

// Lunch intent function
var launchIntentFunction = function(req, res){
    var prompt = 'Greeting to you! What is your name?';
    res.say(prompt).shouldEndSession(false);
};

// Cancle/Stop intent function
var cancelIntentFunction = function(req, res) {
  var prompt = 'Goodbye! Hope to talk to you again.';
  res.say(prompt).shouldEndSession(true);
};  

// Help intent function
var helperIntentFunction = function(req, res){
    var promt = 'To start tell me your name. You can also say stop or cancel to exit.';
    res.say(promt).shouldEndSession(false);
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helperIntentFunction);

app.intent('NameIntent', {
    'slots':{'NAME':'LITERAL'}
    ,'utterances':['{My name is} {bob|nick|matt|jane|NAME}']
},function(req, res){
    var greeter = new Greeter();
    var prompt = greeter.getGreeting()+' '+req.slot('NAME');
    console.log(prompt);
    res.say(prompt).shouldEndSession(false);
});

module.exports = app;