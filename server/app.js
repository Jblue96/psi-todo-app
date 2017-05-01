var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var pg = require('pg');

// Config object used to connect to our database
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

// GET route, returns all todo items
app.get('/todo', function(req, res){
  //res.send('Hello world.');
  pool.connect(function(error, db, done){
    if(error) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM "todo" ORDER BY "published" ASC;',
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

// POST route, inserts a new todo item
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

// DELETE route, deletes a todo item matching the id
app.delete('/todo/:id', function(req, res){
  var todoid = req.params.id;
  pool.connect(function(error, db, done){
    if(error) {
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "todo" WHERE  '
               + '"id" = ($1);', [todoid],
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

// PUT route to toggle the completed state of the item
app.put('/todo/toggle/:id', function(req, res){
  var todoid = req.params.id;
  pool.connect(function(error, db, done){
    if(error) {
      res.sendStatus(500);
    } else {
      // Setting a value to NOT value will toggle the value
      db.query('UPDATE "todo" SET "completed" = NOT "completed" WHERE  '
               + '"id" = ($1);', [todoid],
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

// Start up our server
app.listen(port, function() {
  console.log('Listening on port', port);
});
