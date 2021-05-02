module.exports.run_setup = function(app) {

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
}