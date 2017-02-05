'use strict';

module.change_code = 1;

var _ = require('lodash');

var Greeter = require('./greeter');

var alexa = require('alexa-app');

var app = new alexa.app('greeter');

// Launch intent function
var launchIntentFunction = function (req, res) {
    var prompt = 'Greeting to you! What is your name?';
    res.say(prompt).shouldEndSession(false);
};

// Cancle/Stop intent function
var cancelIntentFunction = function (req, res) {
    var prompt = 'Goodbye! Hope to talk to you again.';
    res.say(prompt).shouldEndSession(true);
};

// Help intent function
var helperIntentFunction = function (req, res) {
    var promt = 'To start tell me your name. You can also say stop or cancel to exit.';
    res.say(promt).shouldEndSession(false);
};

// Name intent function 
var nameIntentFuction = function (req, res) {
    var name = req.slot('NAME');

    var reprompt = 'Tell me your name.';

    if (_.isEmpty(name)) {
        var prompt = 'I didn\'n hear your name.';

        res.say(prompt).reprompt(reprompt).shouldEndSession();

        return true;
    } else {
        var greeter = new Greeter();

        var prompt = greeter.getGreeting() + ' ' + name;

        console.log(prompt);

        res.say(prompt).shouldEndSession(false);
    }
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helperIntentFunction);

app.intent('NameIntent', {
    'slots': {
        'NAME': 'LITERAL'
    },
    'utterances': ['{My name is|Name is|I am} {bob|nick|matt|jane|NAME}']
}, nameIntentFuction);

module.exports = app;