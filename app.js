/* 기본 */
var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var bodyParser = require('body-parser');
const md5 = require('md5');
var router = express.Router();

/* mysql 연결 */
var mysql = require('mysql');
var db = mysql.createConnection({
    user: 'root',
    port : 3306,
    password: '111111',
    database: 'MyWay'
  });
  db.connect();

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

/* 이미지, css, js 연결 */
app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.static('image'));
app.use(express.static('js'));

/* localhost:3000 */
app.listen(3000, function () {
  console.log('server running at localhost:3000');
});

var userId;
var userPw;

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

/* 역검색 */
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
              response.redirect("/M"+rows[0]['num']);

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
  db.query('INSERT INTO sign (id, password, email, name, phone, secret) VALUES (?, ?, ?, ?, ?,?)', [
      body.id, md5(body.password), body.email, body.name, body.phone, body.password
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
  userId = request.body['userId'];
  userPw = md5(request.body['userPw']);
  db.query('select * from sign where id=? and password=?',[userId,userPw], function (err, rows, fields) {
      if (!err) {
          if (rows[0]!=undefined) {
              response.redirect('/homeLogin');

          } else {
              response.send('no data');
          }
      } else {
          response.send('error : ' + err);
      }
  });
});

/* 마이페이지 */
app.get('/user', function (request, response) {
  fs.readFile('user.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM sign where id=? and password=?',[userId,userPw], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 로그인 후 화면 */
app.get('/homeLogin', function (request, response) {
  fs.readFile('homeLogin.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/homeLogin', function (request, response) {
  var stationName = request.body['stationName'];
  db.query('select * from station where 역이름=?',[stationName], function (err, rows, fields) {
      if (!err) {
          if (rows[0]!=undefined) {
            /*
              response.send('id : ' + rows[0]['id'] + '<br>' +
                  'pw : ' + rows[0]['password']+'<br>'+
                  'name : '+rows[0]['name']);
            */
              response.redirect("/M"+rows[0]['num']);

          } else {
              response.send('no data');
          }

      } else {
          response.send('error : ' + err);
      }
  });
});


/* 회원 정보 수정 */
app.get('/signInfo', function (request, response) {
  fs.readFile('signInfo.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM sign where id=? and password=?',[userId,userPw], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/signInfo', function (request, response) {
  var id = request.body['id'];
  var password = request.body['password'];
  var email = request.body['email'];
  var name = request.body['name'];
  var phone = request.body['phone'];
  fs.readFile('signInfo.html', 'utf8', function (error, data) {
    db.query('update sign set password=?,email=?,name=?,phone=?,secret=? WHERE id = ?', [
        md5(password),email,name,phone,password,id
    ], function (error, result) {
      response.redirect("/");
    });
  });
});

/* 회원탈퇴 */
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

/* 게시판 화면*/
/* 게시판 */
app.post('/board', function (request, response) {
  fs.readFile('board.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/board', function (request, response) {
  fs.readFile('board.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 게시판 mysql에 좋아요 +1 */
app.get('/board/edit/:id', function (request, response) {
  fs.readFile('board.html', 'utf8', function (error, data) {
    db.query('update board set love=love+1 WHERE num = ?', [
        request.params.id
    ], function (error, result) {
      response.redirect("/board#"+(1+request.params.id*1));
    });
  });
});

/* 게시판 글쓰기 */
app.get('/insert', function (request, response) {
  fs.readFile('boardInsert.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

app.post('/insert', function (request, response) {
  var body = request.body;
  db.query('INSERT INTO board (title, description, love,type) VALUES (?, ?,0, ?)', [
      body.title, body.description, body.type
  ], function () {
    response.redirect('/board');
  });
});

/* 좋아요 순으로 정렬 */
app.get('/board/like', function (request, response) {
  fs.readFile('board.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board order by love asc', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/board', function (request, response) {
  fs.readFile('board.html', 'utf8', function (error, data) {
    db.query(' select * from board order by love DESC;', function (error, result) {
      response.redirect("/board/like");
    });
  });
});

/* 상세보기 */
/* 1호선 */
app.get('/M:id', function (request, response) {
  fs.readFile('./public/html/1호선/1호선/M'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/M:id', function (request, response) {
  var stationName = request.body['stationName'];
  db.query('select * from station where 역이름=?',[stationName], function (err, rows, fields) {
      if (!err) {
          if (rows[0]!=undefined) {
              response.redirect("/M"+rows[0]['num']);

          } else {
              response.send('no data');
          }

      } else {
          response.send('error : ' + err);
      }
  });
});

/* 상세보기 세번째 div 역정보 */
app.get('/I:id', function (request, response) {
  fs.readFile('./public/html/1호선/1호선_info/I'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});  

/* 상세보기 */
/* 2호선 */
  app.get('/M:id', function (request, response) {
    fs.readFile('./public/html/2호선/2호선/M'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });

  app.post('/M:id', function (request, response) {
    var stationName = request.body['stationName'];
    db.query('select * from station where 역이름=?',[stationName], function (err, rows, fields) {
        if (!err) {
            if (rows[0]!=undefined) {
                response.redirect("/M"+rows[0]['num']);
  
            } else {
                response.send('no data');
            }
  
        } else {
            response.send('error : ' + err);
        }
    });
  });

  /* 상세보기 세번째 div 역정보 */
  app.get('/I:id', function (request, response) {
    fs.readFile('./public/html/2호선/2호선_info/I'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });  


/* 수원역 해시태그 */
app.post('/138H', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
      tagName
  ], function () {
    response.redirect('/138#');
  });
});

/* 수원역 상세보기 */
app.get('/138', function (request, response) {
  fs.readFile('suwon.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/138', function (request, response) {
  var stationName = request.body['stationName'];
  db.query('select * from station where 역이름=?',[stationName], function (err, rows, fields) {
      if (!err) {
          if (rows[0]!=undefined) {
              response.redirect("/M"+rows[0]['num']);

          } else {
              response.send('no data');
          }

      } else {
          response.send('error : ' + err);
      }
  });
});

/* 상세보기 첫번째 div 게시판 */
app.get('/boardS', function (request, response) {
  fs.readFile('boardS.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 상세보기 두번째 div 해시태그 */
app.get('/hashtag', function (request, response) {
  fs.readFile('hashtag.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.post('/hashtag', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
      tagName
  ], function () {
    response.redirect('/hashtag');

    });
  });

/* 상세보기 세번째 div 역정보 */
app.get('/information', function (request, response) {
  fs.readFile('information.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
<<<<<<< HEAD





  app.get('/M:id', function (request, response) {
    fs.readFile('./public/html/3호선/3호선/M' + request.params.id + '.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=? and 선="3"',[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });



  app.get('/I:id', function (request, response) {
    fs.readFile('./public/html/3호선/3호선_info/I'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?', [request.params.id], function (error,results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });


 

=======
>>>>>>> ba18367316861f5d6bde5e56ceff307d94fda52c
