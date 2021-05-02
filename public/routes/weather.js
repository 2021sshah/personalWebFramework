var https = require('https');
var options = {headers : {'User-Agent' : 'request'}};

module.exports.run_setup = function(app) {
    app.get('/weather', [func00, func01, func02, func03]);
};

function func00(req, res, next) {
    
    if(req.query.lat !== "" && req.query.long !== "" -180 < parseInt(req.query.lat) < 180 && -180 < req.query.long < 180) {
        res.locals.lat = req.query.lat;
        res.locals.long = req.query.long;
        res.locals.valid = true;
    }
    else {
        res.locals.lat = 38.8536;
        res.locals.long = -77.227;
        res.locals.valid = false;
    }
    
    var today = new Date();
    res.locals.date = today.toString();
    
    var url = 'https://api.weather.gov/points/' + res.locals.lat + ',' + res.locals.long;
    https.get(url, options, function(response) {
	   
		var rawData = '';
		response.on('data', function(chunk) {
			rawData += chunk;
		} );
		
		response.on('end', function() {
		    res.locals.obj = JSON.parse(rawData);
            next();
		} );
	});
}

function func01(req, res, next) {
    
    if(res.locals.obj.title != "Unexpected Problem") {
        res.locals.invalidP = "Found";
        var foreCastURL = res.locals.obj.properties.forecastHourly;
        
        https.get(foreCastURL, options, function(response) {
	   
		    var rawData = '';
		    response.on('data', function(chunk) {
			    rawData += chunk;
		    } );
		
		    response.on('end', function() {
		        res.locals.forecast = JSON.parse(rawData);
                next();
		    } );
	    });
    }
    
    else {
        res.locals.invalidP = "Empty";
        next();
    }
}

function func02(req, res, next) {
    
    if( res.locals.invalidP == "Empty" ){
        res.locals.forecastList = [];
        next();
    }
    
    else{
        tempArr = [];
        var forecastByHour = res.locals.forecast.properties.periods;
        for(var x = 0; x < 8; x++){                // use forecast.length for maximum array
            tempArr.push(forecastByHour[x]);
            tempArr[x].startHour = forecastByHour[x].startTime.substring(11,16);
        }
        res.locals.forecastList = tempArr;
        next();
    }
}

function func03(req, res) {         // Render the hbs page

    if(!res.locals.valid) {
        res.locals.valid = "Point is invalid. Default point at lattitude 38.8536 and longitude -77.227";
    }
    if( res.locals.invalidP == "Empty" ) {
        res.locals.valid = "Could not find data for given point.";
    }

    var info = res.locals;
    if(req.query.format && req.query.format == "json" )
        res.json(info);
    res.render('weather', info);
}