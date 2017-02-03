'use strict';

var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

var NutritionDataHelper = require('../nutrition_data_helper');

chai.config.includeStack = true;

describe('NutritionDataHelper', function () {

    var subject = new NutritionDataHelper();

    var food;

    describe('#getNutritionData', function () {

        context('with a valid food name', function () {

            it('returns matching food calories', function () {

                food = 'apple';

                var value = subject.requestNutritionData(food).then(function (obj) {

                    return obj.hits[0].fields.nf_calories;

                });

                return expect(value).to.eventually.eq(56.68);
            });
        });
    });
});