var https = require('https');
var options = {headers : {'User-Agent' : 'request'}};

module.exports.run_setup = function(app) {
    app.get('/apod', [func01, func02]);
};

function func01(req, res, next) {   // Retrieve info from Nasa
    
    if('date' in req.query) {
        var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + req.query.date;
    }
    else {
        var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
    }
//    var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2021-03-04';
    
    https.get(url, options, function(response) {
	   
//	    response.on('error', ...);

		var rawData = '';

		response.on('data', function(chunk) {
			
			rawData += chunk;

		} );
		
		response.on('end', function() {

		    res.locals = JSON.parse(rawData);
            next();
            
		} );
	});
}

function func02(req, res) {         // Render the hbs page
    
    var obj = res.locals;
    
//    res.json(obj);
    
    res.render('apod', obj);
}