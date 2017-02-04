'use strict';

module.change_code = 1;

var _ = require('lodash');

var alexa = require('alexa-app');

var app = new alexa.app('synonymizer');

var thesaurus = require('thesaurus');

// Launch intent function
var launchIntentFunction = function (req, res) {
    var prompt = 'Greeting to you! What word would you like to get synonymies for?';
    res.say(prompt).shouldEndSession(false);
};

// Help intent function
var helpIntentFunction = function (req, res) {
    var help = 'To start tell me the word that you would like to find synonymies for? You can also say stop or cancel to exit.';
    res.say(help).shouldEndSession(false);
};

// Cancel intent function
var cancelIntentFunction = function (req, res) {
    res.say('Goodbye! Hope to talk to you again!').shouldEndSession(true);
};

// Word intent function
var wordIntentFuction = function (req, res) {
    var word = req.slot('WORD');

    var reprompt = 'Tell me a word to get synonymies for.';

    if (_.isEmpty(word)) {
        var prompt = 'I didn\`t her a word.';

        res.say(prompt).reprompt(reprompt).shouldEndSession(false);

        return true;
    } else {
        var synonymies = thesaurus.find(word);
        
        if (_.isEmpty(synonymies)) {
            var prompt = word + 'does not exist.';

            res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
        } else {
            res.say('Ther are ' + synonymies.length + ' synonymies for ' + word + '. They are ' + synonymies.join(', ') + '.');
        }
    }
};

app.launch(launchIntentFunction);

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {}, helpIntentFunction);

app.intent('WordIntent', {
    'slots': {
        'WORD': 'LITERAL'
    },
    'utterances': ['{The world is|Synonymies for|Similar words for|Same words for} {apple|orange|car|boat|happy}']
}, wordIntentFuction);

module.exports = app;