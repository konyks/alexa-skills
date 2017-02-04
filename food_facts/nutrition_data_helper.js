'use strict'

var _ = require('lodash');

var rp = require('request-promise');

var ENDPOINT = 'https://nutritionix-api.p.mashape.com/v1_1/search/';

var PARAMETERS = '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat';

var APIKEY = ''; //Add API Key

function NutritionDataHelper() {}

// Request Nutrition Data Function
NutritionDataHelper.prototype.requestNutritionData = function (foodName) {
    return this.getNutritionData(foodName).then(
        function (response) {
            console.log('success - received nutrition data for ' + foodName);

            return response.body;
        }
    );
};

// Get Nutrition Data Function
NutritionDataHelper.prototype.getNutritionData = function (foodName) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + foodName + PARAMETERS,
        headers: {
            'X-Mashape-Key': APIKEY,
            'Accept': 'application/json'
        },
        resolveWithFullResponse: true,
        json: true
    };

    return rp(options);
};

// Format Nutrition Data
NutritionDataHelper.prototype.formatNutritionData = function (foodData) {
    var caloriesData = _.template('${food} has ${calories} calories.')({
        food: foodData.hits[0].fields.item_name,
        calories: foodData.hits[0].fields.nf_calories
    });

    return caloriesData;
};

module.exports = NutritionDataHelper;