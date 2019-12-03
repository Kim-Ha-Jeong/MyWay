var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();

/* mysql 연결 */
var db = mysql.createConnection({
  user: 'root',
  port : 3306,
  password: '1234',
  database: 'MyWay'
});
db.connect();

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

/* 홈 */
app.get('/', function (request, response) {
  fs.readFile('home.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/', function (request, response) {
  var stationName = request.body['stationName'];
  db.query('select * from station where 역이름=?',[stationName], function (err, rows, fields) {
      if (!err) {
          if (rows[0]!=undefined) {
            /*
              response.send('id : ' + rows[0]['id'] + '<br>' +
                  'pw : ' + rows[0]['password']+'<br>'+
                  'name : '+rows[0]['name']);
            */
              response.redirect("/"+rows[0]['num']);

          } else {
              response.send('no data');
          }

      } else {
          response.send('error : ' + err);
      }
  });
});

/* 회원가입 */
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

/* 로그인 */
module.exports = router;
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
                  'pw : ' + rows[0]['password']+'<br>'+
                  'name : '+rows[0]['name']);
            */
              response.redirect('/');

          } else {
              response.send('no data');
          }
      } else {
          response.send('error : ' + err);
      }
  });
});

app.get('/dropOut', function (request, response) {
  fs.readFile('dropOut.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

app.post('/dropOut', function(request,response,next){
  var id = request.body['id'];
  var passwd = request.body['passwd'];
  db.query('delete from sign where id=? and password=?',[id,passwd], function (err, rows, fields) {
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
})

app.get('/138', function (request, response) {
  fs.readFile('suwon.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});


/* 게시판 화면*/
app.get('/board', function (request, response) {
  fs.readFile('board.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 게시판 글 상세보기 */
app.get('/board/:num', function (request, response) {
  //파일 읽기
  fs.readFile('boardPost.html', 'utf8', function (error, data) {
    //데이터베이스 쿼리 실행
    db.query('SELECT * FROM board WHERE num=?', [request.params.num], function (error, results) {
      //응답
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/boardS', function (request, response) {
  fs.readFile('boardS.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/insert', function (request, response) {
  fs.readFile('boardInsert.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

app.post('/insert', function (request, response) {
  var body = request.body;
  db.query('INSERT INTO board (title, description) VALUES (?, ?)', [
      body.title, body.description
  ], function () {
    response.redirect('/board');
  });
});

app.get('/hashtag', function (request, response) {
  fs.readFile('hashtag.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information', function (request, response) {
  fs.readFile('information.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});