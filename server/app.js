var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

// Default location for index.html
app.use(express.static('server/public'));

app.listen(port, function() {
  console.log('Listening on port', port);
})
