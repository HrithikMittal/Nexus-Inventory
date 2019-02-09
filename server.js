var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Details = require("./app/modules/inventoryitem");
var MongoClient = require("mongodb").MongoClient;

// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 3004;

var url = "mongodb://adhi012:password123@ds141796.mlab.com:41796/signup";

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error("An error occurred connecting to MongoDB: ", err);
  }
  const dbo = client.db("signup");

  //API Routes
  var router = express.Router();

  // Routes will all be prefixed with /API
  app.use("/api", router);

  //MIDDLE WARE-
  router.use(function(req, res, next) {
    console.log("FYI...There is some processing currently going down");
    next();
  });

  // test route
  router.get("/", function(req, res) {
    res.json({
      message: "Welcome !"
    });
  });

  // add inventory item to backend database
  router
    .route("/cash")
    .post(function(req, res) {
      var casht = new Details();
      casht.mobile_no = req.body.mobile_no;
      casht.inventory_name = req.body.inventory_name;
      casht.inventory_category = req.body.inventory_category;
      casht.inventory_qty = req.body.inventory_qty;
      casht.inventory_cost = req.body.inventory_cost;

      dbo
        .collection("inventory_details")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: "Cash Transcation is successfully Add"
          });
        });
    })
    .get(function(req, res) {
      Details.find(function(err, details) {
        if (err) {
          res.send(err);
        }
        res.json(details);
      });
    });

  router.route("/cash/mobile_no/:mobile_no").get(function(req, res) {
    Details.find(
      {
        mobile_no: req.params.bname
      },
      function(err, detail) {
        if (err) {
          res.send(err);
        }
        res.json(detail.bname);
      }
    );
  });
});

// Fire up server
app.listen(port);

// print friendly message to console
console.log("Server listening on port " + port);
