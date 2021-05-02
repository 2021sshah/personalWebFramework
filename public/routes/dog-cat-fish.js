module.exports.run_setup = function(app) {
    
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
}