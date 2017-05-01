var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var pg = require('pg');

var config = {
  database: 'psi',
  host: 'localhost',
  port: 5432, // Default port that postgres runs on
  max: 10, // Max number of connections
  idleTimeoutMillis: 30000 // 30 seconds
};

var pool = new pg.Pool(config);

app.use(bodyParser.urlencoded({extended:true}));

// Default location for index.html
app.use(express.static('server/public'));

app.get('/todo', function(req, res){
  //res.send('Hello world.');
  pool.connect(function(error, db, done){
    if(error) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM "todo";',
               function(error, result){
                 done();
                 if(error) {
                   res.sendStatus(500);
                 } else {
                   res.send(result.rows);
                 }
               });
    }
  });
});

app.post('/todo', function(req, res){
  console.log(req.body);
  var description = req.body.description;
  pool.connect(function(error, db, done){
    if(error) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "todo" ("description") '
               + 'VALUES ($1);', [description],
               function(error, result){
                 done();
                 if(error) {
                   res.sendStatus(500);
                 } else {
                   res.sendStatus(200);
                 }
               });
    }
  });
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
