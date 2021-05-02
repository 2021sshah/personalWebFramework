var cookieSession = require('cookie-session');

module.exports.run_setup = function(app) {
    
    app.use(cookieSession( {
    
         name: 'thisisthenameofthecookie',
         keys: ['secretkeysgohere', 'theyrejuststrings', 'butcanputabunch']
    
    }));

    app.get('/cookies', function(req, res) {
         
        if('reset' in req.query || !('visit_count' in req.session)){
            req.session.visit_count = 1;
        }
        else {
            req.session.visit_count += 1;
        }
        
        res.render("cookies", req.session);
    });
}