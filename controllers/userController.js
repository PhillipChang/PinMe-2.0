var db = require("../models");

module.exports = function(app) {

app.post("/api/users/register", function(req, res) {
    console.log("This is working");
    var user = req.body;
    console.log(user);
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        uuid: req.body.uuid,
        classes: req.body.classes,
        contact: req.body.contact,
        avatar: req.body.avatar
    })
    .then(function(dbUser){
        res.json(dbUser);
    });
});

};