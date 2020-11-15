// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
  next();
});


// your first API endpoint... 
app.get('/api/timestamp/:date?', function (req, res) {
  console.log(req.params);
  // User entered paramerters 
  const USERDATE = req.params.date;
  var date;

  // Handle empty paramters
  if(!USERDATE){
    // Set date to today's day if none provided 
    date = new Date();
  }else {
    // Check for valid date
    if(!isNaN(USERDATE)){
      // Parameter entered is a number
      date = new Date(parseInt(USERDATE));
    }else {
      // Parameter is a string
      date = new Date(USERDATE);
    }
  }

  // Checks if valid date was entered 
  if(date.toString() === 'Invalid Date'){
    // Invalid date was entered, return json error message
    res.json({ error: 'Invalid Date' });
  }else {
    // Displays json formated date, both in unix and utc
    res.json( { unix: date.getTime(), utc: date.toUTCString() } );
  }
});

// Non-existing routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/views/error.html')
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
