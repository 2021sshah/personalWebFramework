var demo = require('./demo.js');
var test = require('./test.js');
var pets = require('./dog-cat-fish.js');
var facts = require('./facts.js');
var apod = require('./apod.js');
var weather = require('./weather.js');
var cookies = require('./cookies.js');

module.exports.do_setup = function(app) {
    demo.run_setup(app);
    test.run_setup(app);
    pets.run_setup(app);
    facts.run_setup(app);
    apod.run_setup(app);
    weather.run_setup(app);
    cookies.run_setup(app);
};