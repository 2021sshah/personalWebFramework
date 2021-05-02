var demo = require('./demo.js');
var test = require('./test.js');
var pets = require('./dog-cat-fish.js');
var facts = require('./facts.js');

module.exports.do_setup = function(app) {
    demo.run_setup(app);
    test.run_setup(app);
    pets.run_setup(app);
    facts.run_setup(app);
};