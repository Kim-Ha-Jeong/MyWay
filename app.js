var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var bodyParser = require('body-parser');
/*
var client = mysql.createConnection({
  user: 'root',
  password: 'pearflower2019',
  database: 'pearflower'
  port : 3306
});
*/


/*여기까지 새로 작성*/
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));



app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.static('image'));
app.use(express.static('js'));


//호스팅 할 때는 포트넘버 80 고정
app.listen(3000, function () {
  console.log('server running at localhost:1886');
});

//홈
app.get('/', function (request, response) {
  fs.readFile('home.html', 'utf8', function (error, data) {
      response.send(data);
  });
});