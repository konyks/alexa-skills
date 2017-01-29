'use strict';

module.change_code = 1;

function Greeter(){ }

// Gets a proper greetig based on a time of the day
Greeter.prototype.getGreeting = function()
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

module.exports = Greeter;