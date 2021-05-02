var express = require('express');
var app = express();
var routes = require('./routes');

app.set('port', process.env.PORT||80);
app.set('view engine', 'hbs'); /* hbs */

// ........... express 'get' handlers ............
// These 'getters' are what fetch your pages

app.get('/', function(req, res) {
   console.log('user landed at page');
   // --> looks for a file named ./views/index.hbs
   res.render("index") ; /* hbs */
});

routes.do_setup(app);

app.get('/:page', function(req, res) {
    res.send("ERROR - page does not exist"); /* hbs */
});

// ........... listener ............
// The listener is what keeps node 'alive'

var listener = app.listen(app.get('port'), function() {
   console.log("Express server started on port: " + listener.address().port);
});