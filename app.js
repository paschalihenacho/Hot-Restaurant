// /home, / , "/tables.html", /reserve, /api/tables, /api/waitlist
var express = require("express");
var path = require("path");
// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//VERY IMPORTANT
app.use("/public", express.static(path.join(__dirname, "public")));

// new reservation data
// table reservation: name, phone number, email, unique id, 
const tables = [ 
    {
        // routeName: "Reservation1",
        customerName: "Jim",
        phoneNumber: "555-1234", 
        customerEmail: "email@email.com",
        customerID: "1234"
    }
];
const waitlist = [];
// Setting up routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/api/tables", function(req, res) {
  var newReservation = req.body;
  console.log(newReservation);
    return res.json(tables);
});
// displays all reservations
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});
// Create new reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
    
    var newReservation = req.body;
    //newReservation.customerName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
   // tables.push(newReservation);
    res.json(newReservation);

    if(tables.length > 4){
          waitlist.push(newReservation)
        } else {
          tables.push(newReservation)
        }

});
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});