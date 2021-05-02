var express = require('express');
var app = express();

app.set('port', process.env.PORT||80);
app.set('view engine', 'hbs'); /* hbs */

// ........... express 'get' handlers ............
// These 'getters' are what fetch your pages

app.get('/', function(req, res) {
   console.log('user landed at page');
   // --> looks for a file named ./views/index.hbs
   res.render("index") ; /* hbs */
});

app.get('/test', function(req, res) {
    console.log('user landed at page: test');
    // --> looks for a file named ./views/test.hbs
    res.render("test", {val:7, dare: 5}); /* hbs */
});

app.get('/demo', function(req, res) {
    var today = new Date();
    var month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    var obj = {};
    obj.mylist = ['dog', 'cat', 'fish'];
    obj.rand = Math.floor(1+10*Math.random());
    obj.epoch = Date.now()/1000.0 ; // seconds (from milliseconds) since January 1, 1970 00:00:00 UTC, with leap seconds ignored
    obj.month = month_names[today.getMonth()];
    obj.year = today.getFullYear();
    
    res.render('demo', obj);
});

app.get('/dog', function(req, res) {
    console.log('user landed at page: dog');
    
    var obj = {};
    obj.message = "Prank! This is *not* a DOG.";
    obj.url = "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg";

    res.render("pets", obj); /* hbs */
});

app.get('/cat', function(req, res) {
    console.log('user landed at page: cat');
    
    var obj = {};
    obj.message = "Prank! This is *not* a CAT.";
    obj.url = "https://i.insider.com/5484d9d1eab8ea3017b17e29?width&#x3D;1100&amp;format&#x3D;jpeg&amp;auto&#x3D;webp";

    res.render("pets", obj); /* hbs */
});

app.get('/fish', function(req, res) {
    console.log('user landed at page: fish');
    res.render("instructions"); /* hbs */
});

app.get('/pet', function(req, res) {
    console.log('user landed at page: query pet');
    
    var obj= {}
    if(req.query.type == "dog"){
        obj.message = "Here is a dog.";
        obj.url = "https://i.insider.com/5484d9d1eab8ea3017b17e29?width&#x3D;1100&amp;format&#x3D;jpeg&amp;auto&#x3D;webp";
        
    }
    else if(req.query.type == "cat") {
        obj.message = "Here is a cat.";
        obj.url = "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg";
    }
    else {
        obj.message = "Sorry but something has gone wrong...";
        obj.url = "https://www.theschoolrun.com/sites/theschoolrun.com/files/article_images/what_is_a_question_mark.png";
    }
    res.render("pets", obj); /* hbs */
});

app.get('/facts', function(req, res) {
    var obj = {}
    if(req.query.topic == "fruit") {
        var fruit =    ["Not all oranges are colored orange.",
                        "Japanese Yubari cantaloupes are the most expensive fruit in the world; two melons once sold at auction for $23,500.",
                        "Cherry farmers hire helicopter pilots to air-dry their trees after it rains so that the cherries don't split open.",
                        "The apple you're eating might be a year old.",
                        "Bananas, as we know them, are in danger of being completely wiped out by disease.",
                        "Donut peaches are a natural mutant peach variety, not a human-engineered fruit.",
                        "Grapefruit can cause dangerous reactions with some prescription medications.",
                        "One pomegranate can hold more than 1,000 seeds."];
        obj.mylist = fruit.slice(0, parseInt(req.query.num, 10));
        obj.food = "fruit";
        res.render("facts", obj); /* hbs */
    }
    else if(req.query.topic == "vegetables") {
        var vegetables =    ["Tomatoes were once considered poisonous.",
                            "You can use cucumbers as erasers.",
                            "Eating too many carrots really does turn you orange.",
                            "Tomatoes are legally a vegetable.",
                            "The vegetable skins have the most nutrients.",
                            "Potatoes were the first food to be grown in space.",
                            "Asparagus loses flavor the fastest.",
                            "Peppers can help your blood clot"];
        obj.mylist = vegetables.slice(0, parseInt(req.query.num, 10));
        obj.food = "vegetable";
        res.render("facts", obj); /* hbs */
    }
    else {
        res.render("noFacts"); /* hbs */
    }
});

app.get('/factsForm', function(req, res) {
    console.log('user landed at page: fish');
    res.render("factsForm"); /* hbs */
});

app.get('/:page', function(req, res) {
    res.send("ERROR - page does not exist"); /* hbs */
});

// ........... listener ............
// The listener is what keeps node 'alive'

var listener = app.listen(app.get('port'), function() {
   console.log("Express server started on port: " + listener.address().port);
});