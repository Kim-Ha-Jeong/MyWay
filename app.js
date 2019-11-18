var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var db = mysql.createConnection({
  host : "http://localhost:3000",
  user: 'root',
  port : 3306,
  password: '111111',
  database: 'MyWay'
});
db.connect();

app.get('/insert', function (request, response) {
  fs.readFile('noticeInsert.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

app.post('/noticeManager/insert', function (request, response) {
  var body = request.body;
  client.query('INSERT INTO postlist (num, title, post) VALUES (?, ?, ?)', [
      body.num, body.title, body.post
  ], function () {
    response.redirect('/noticeManager');
  });
});

/*여기까지 새로 작성*/
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.static('image'));
app.use(express.static('js'));


app.listen(3000, function () {
  console.log('server running at localhost:3000');
});

//홈
app.get('/', function (request, response) {
  fs.readFile('home.html', 'utf8', function (error, data) {
      response.send(data);
  });
});

app.get('/picture', function (request, response) {
  fs.readFile('picture.html', 'utf8', function (error, data) {
      response.send(data);
  });
});

app.get('/sign', function (request, response) {
  fs.readFile('sign.html', 'utf8', function (error, data) {
      response.send(data);
  });
});
