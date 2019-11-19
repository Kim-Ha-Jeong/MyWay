var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  port : 3306,
  password: '111111',
  database: 'MyWay'
});
db.connect();


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

app.get('/signUp', function (request, response) {
  fs.readFile('signUp.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

app.post('/signUp', function (request, response) {
  var body = request.body;
  db.query('INSERT INTO sign (id, password, email, name, phone) VALUES (?, ?, ?, ?, ?)', [
      body.id, body.password, body.email, body.name, body.phone
  ], function () {
    response.redirect('/');
  });
});

var express = require('express');
var router = express.Router();

app.get('/login', function (request, response) {
  fs.readFile('login.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

app.post('/login', function (request, response) {
    var userId = request.body['userId'];
    var userPw = request.body['userPw'];
    db.query('select * from sign where id=? and password=?',[userId,userPw], function (err, rows, fields) {
        if (!err) {
            if (rows[0]!=undefined) {
              /*
                response.send('id : ' + rows[0]['id'] + '<br>' +
                    'pw : ' + rows[0]['password']);
              */
                response.redirect('/')
            } else {
                response.send('no data');
            }

        } else {
            response.send('error : ' + err);
        }
    });
});

module.exports = router;