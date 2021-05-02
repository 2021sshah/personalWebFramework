var cookieSession = require( 'cookie-session' ) ;
var https = require( 'https' ) ;
const {  AuthorizationCode } = require('simple-oauth2') ;

var options = { headers : { 'User-Agent' : 'request' } } ;

// https://ion.tjhsst.edu/oauth/applications

var ion_client_id     = "fP6LiuKhelvOoU0oBQv9vc7LP7kzkjpj05ZkqNy4";
var ion_client_secret = "hvn9Ctlj2ornTDUiNMb6oN3W7Rmd8Akfn5UZSilpubSTFd4mmG0GFpc4D0Pxgw3PdSNwNPVDIeVxiTsx3YSAD08t33fchKM4QDBc3xEmpSZHC9SyOKeuN6in47St7aLU";
var ion_redirect_uri  = "https://shah2021.sites.tjhsst.edu/cookielogin";

var client = new AuthorizationCode( {
    client : {
        id : ion_client_id ,
        secret : ion_client_secret ,
    } ,
    auth : {
        tokenHost : 'https://ion.tjhsst.edu/oauth/' ,
        authorizePath : 'https://ion.tjhsst.edu/oauth/authorize' ,
        tokenPath : 'https://ion.tjhsst.edu/oauth/token/'
    }
});

var authorizationUri = client.authorizeURL( {
    scope : 'read',
    redirect_uri : ion_redirect_uri
});

// ******************************************************************************

module.exports.run_setup = function(app) {
    
    app.use(cookieSession( {
    
         name: 'authorizationCookie',
         keys: ['secretkeysgohere', 'theyrejuststrings', 'butcanputabunch']
    
    }));

    app.get('/cookieauth', [check_if_login, get_user_name, render_with_name]);
    
    // my redirect back from ION
    app.get('/cookielogin', [handle_code, store_token]);
    
    // this is all it takes to "logout"
    app.get('/cookielogout', function(req, res) {
        delete req.session.token;
        res.redirect('https://shah2021.sites.tjhsst.edu/cookieauth');
    } ) ;
}

function check_if_login(req, res, next) {
    if(req.session.token) {
        
        res.locals.check = "Access token found";
        
        var access_token = req.session.token.access_token;
        var url = "https://ion.tjhsst.edu/api/profile?format=json&access_token=" + access_token;
        
        console.log(url);
        
  //      if(!req.session.info) {
            https.get(url, options, function(response) {
        		
        		var rawData = '';
        		response.on('data', function(chunk) {
        			rawData += chunk;
        		} );
    		
        		response.on('end', function() {
        		    req.session.info = JSON.parse(rawData);
        		    next();
        		} );
    	    });
   //     }
    }
    
    else {
        res.locals.check = "Access token not found";
        next();
    }
}

function get_user_name(req, res, next) {
    
    if(req.session.token) {
        res.locals.name = req.session.info.first_name  + " (" + req.session.info.id + ")";
        res.locals.button = "logout";
        res.locals.url = "https://shah2021.sites.tjhsst.edu/cookielogout";
    }
    else {
        res.locals.name = "you";
        res.locals.button = "login";
        res.locals.url = authorizationUri;
    }
    
    if('reset' in req.query || !('visit_count' in req.session)){
        req.session.visit_count = 1;
    }
    else {
        req.session.visit_count += 1;
    }
    res.locals.visit_count = req.session.visit_count;
    next();
}

function render_with_name(req, res, next) {
    res.render("cookieauth", res.locals);
}

async function handle_code(req, res, next) {
    var theCode = req.query.code;
    
    var theOptions = {
        'code'         : theCode          ,
        'redirect_uri' : ion_redirect_uri , /* must match! */
        'scope'        : 'read'
    };
    
    // needs to be in a try-catch
    
    try {
        // await serializes the asynchronous function call
        var accessToken = await client.getToken(theOptions);
        res.locals.token = accessToken.token;
        next();
    } 
    catch (err) {
        res.send("ERROR - accessToken does not exist");
    }
}

function store_token(req, res) {
    req.session.token = res.locals.token;
    res.redirect('https://shah2021.sites.tjhsst.edu/cookieauth');
}