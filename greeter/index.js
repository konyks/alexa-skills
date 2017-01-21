'use strict';

module.change_code = 1;

var alexa = require('alexa-app');

var app = new alexa.app('greeter');

app.launch(function(req,res){
    var prompt = 'Greeting to you! What is your name?';
});

var cancelIntentFunction = function(req, res) {
  res.say('Goodbye!').shouldEndSession(true);
};

app.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);

app.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

app.intent('AMAZON.HelpIntent', {},
  function(req, res) {
    var help = 'Welcome to Greeter. To start tell me your name. You can also say stop or cancel to exit.';
    response.say(help).shouldEndSession(false);
  });

app.intent('NameIntent', {
    'slots':{'NAME':'LITERAL'}
    ,'utterances':['{My name is} {bob|nick|matt|jane|NAME}']
},function(req,res){
    res.say(getGreeting()+' '+req.slot('NAME'));
});

function getGreeting()
{
    var time = new Date().getHours();
    var greeting = 'Hello'
    
    if(time < 12)
    {
        greeting = 'Good Morning';
    }
    else if(time < 17)
    {
        greeting = 'Good Afternoon';
    }
    else{
        greeting = 'Good Evening';
    }

    return greeting;
}

module.exports = app;