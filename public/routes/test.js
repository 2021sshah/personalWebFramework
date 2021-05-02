module.exports.run_setup = function(app) {

    app.get('/test', function(req, res) {
        console.log('user landed at page: test');
        // --> looks for a file named ./views/test.hbs
        res.render("test", {val:7, dare: 5}); /* hbs */
    });
}