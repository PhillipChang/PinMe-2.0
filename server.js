var express = require("express");
var fileUpload = require("express-fileupload");
var app = express();
var PORT = process.env.PORT || 8080;

// Initializing Middleware
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Requiring models from database
var db = require("./models")
 

// Initializing Sequelize database
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        require("./controllers/pinmeController")(app, db.Sequelize);
        require("./controllers/userController")(app, db.Sequelize);
      console.log("App listening on PORT " + PORT);
    });
  });