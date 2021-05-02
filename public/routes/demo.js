module.exports.run_setup = function(app) {

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
}