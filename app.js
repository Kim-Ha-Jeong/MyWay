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
    password: '1234',
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
  var len=stationName.length;
  if(stationName.includes('역')){
    stationName=stationName.substring(0,len-1);
  }
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
  var len=stationName.length;
  if(stationName.includes('역')){
    stationName=stationName.substring(0,len-1);
  }
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
  
/* 상세보기 첫번째 div 게시판 */
app.get('/boardS1', function (request, response) {
  fs.readFile('boardS1.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS2', function (request, response) {
  fs.readFile('boardS2.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS3', function (request, response) {
  fs.readFile('boardS3.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS4', function (request, response) {
  fs.readFile('boardS4.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS5', function (request, response) {
  fs.readFile('boardS5.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS6', function (request, response) {
  fs.readFile('boardS6.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS7', function (request, response) {
  fs.readFile('boardS7.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS8', function (request, response) {
  fs.readFile('boardS8.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardS9', function (request, response) {
  fs.readFile('boardS9.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardSB', function (request, response) {
  fs.readFile('boardSB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});
app.get('/boardSSB', function (request, response) {
  fs.readFile('boardSSB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM board', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});


/* 상세보기 두번째 div 해시태그 */
app.get('/hashtag1', function (request, response) {
  fs.readFile('hashtag1.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag2', function (request, response) {
  fs.readFile('hashtag2.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag3', function (request, response) {
  fs.readFile('hashtag3.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag4', function (request, response) {
  fs.readFile('hashtag4.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag5', function (request, response) {
  fs.readFile('hashtag5.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag6', function (request, response) {
  fs.readFile('hashtag6.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag7', function (request, response) {
  fs.readFile('hashtag7.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag8', function (request, response) {
  fs.readFile('hashtag8.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtag9', function (request, response) {
  fs.readFile('hashtag9.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtagB', function (request, response) {
  fs.readFile('hashtagB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/hashtagSB', function (request, response) {
  fs.readFile('hashtagSB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/H1:id', function (request, response) {
  fs.readFile('hashtag.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H1:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
      tagName
  ], function () {
    response.redirect('/M1'+request.params.id+"#");
    });
  });

app.get('/H2:id', function (request, response) {
  fs.readFile('hashtag2.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H2:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M2' + request.params.id + "#");
  });
});

app.get('/H3:id', function (request, response) {
  fs.readFile('hashtag3.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H3:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M3' + request.params.id + "#");
  });
});

app.get('/H4:id', function (request, response) {
  fs.readFile('hashtag4.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H4:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M4' + request.params.id + "#");
  });
});

app.get('/H5:id', function (request, response) {
  fs.readFile('hashtag5.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H5:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M5' + request.params.id + "#");
  });
});

app.get('/H6:id', function (request, response) {
  fs.readFile('hashtag6.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H6:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M6' + request.params.id + "#");
  });
});

app.get('/H7:id', function (request, response) {
  fs.readFile('hashtag7.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H7:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M7' + request.params.id + "#");
  });
});

app.get('/H8:id', function (request, response) {
  fs.readFile('hashtag8.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H8:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M8' + request.params.id + "#");
  });
});

app.get('/H9:id', function (request, response) {
  fs.readFile('hashtag9.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/H9:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/M9' + request.params.id + "#");
  });
});

app.get('/HB:id', function (request, response) {
  fs.readFile('hashtagB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/HB:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/MB' + request.params.id + "#");
  });
});

app.get('/HSB:id', function (request, response) {
  fs.readFile('hashtagSB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM tag', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.post('/HSB:id', function (request, response) {
  var tagName = request.body['tagName'];
  db.query('INSERT INTO tag (title) VALUES (?)', [
    tagName
  ], function () {
    response.redirect('/MSB' + request.params.id + "#");
  });
});

    /* 상세보기 세번째 div 역정보 */
app.get('/information1', function (request, response) {
  fs.readFile('information1.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information2', function (request, response) {
  fs.readFile('information2.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information3', function (request, response) {
  fs.readFile('information3.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information4', function (request, response) {
  fs.readFile('information4.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information5', function (request, response) {
  fs.readFile('information5.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information6', function (request, response) {
  fs.readFile('information6.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information7', function (request, response) {
  fs.readFile('information7.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information8', function (request, response) {
  fs.readFile('information8.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/information9', function (request, response) {
  fs.readFile('information9.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/informationB', function (request, response) {
  fs.readFile('informationB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/informationSB', function (request, response) {
  fs.readFile('informationSB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where 역이름="수원" and 선="1"', function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 상세보기 전체 검색 */
app.post('/M:id', function (request, response) {
  var stationName = request.body['stationName'];
  var len=stationName.length;
  if(stationName.includes('역')){
    stationName=stationName.substring(0,len-1);
  }
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

/* 1호선 */
app.get('/M1:id', function (request, response) {
  fs.readFile('./public/html/1호선/M1'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"1"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/I1:id', function (request, response) {
  fs.readFile('information1.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"1"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});  

/* 2호선 */
  app.get('/M2:id', function (request, response) {
    fs.readFile('./public/html/2호선/M2'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"2"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });

  app.get('/I2:id', function (request, response) {
    fs.readFile('information2.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"2"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });
  
  /* 3호선 */
  app.get('/M3:id', function (request, response) {
    fs.readFile('./public/html/3호선/M3'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"3"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });

  app.get('/I3:id', function (request, response) {
    fs.readFile('information3.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"3"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });
  
  /* 4호선 */
  app.get('/M4:id', function (request, response) {
    fs.readFile('./public/html/4호선/M4'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"4"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });

  app.get('/I4:id', function (request, response) {
    fs.readFile('information4.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"4"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });

  /* 5호선 */
  app.get('/M5:id', function (request, response) {
    fs.readFile('./public/html/5호선/M5'+request.params.id+'.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"5"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });

  app.get('/I5:id', function (request, response) {
    fs.readFile('information5.html', 'utf8', function (error, data) {
      db.query('SELECT * FROM station where num=?',"5"+[request.params.id], function (error, results) {
        response.send(ejs.render(data, {
          data: results
        }));
      });
    });
  });  

/* 6호선 */
app.get('/M6:id', function (request, response) {
  fs.readFile('./public/html/6호선/M6'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"6"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/I6:id', function (request, response) {
  fs.readFile('information6.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"6"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});  

 /* 7호선 */
 app.get('/M7:id', function (request, response) {
  fs.readFile('./public/html/7호선/M7'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"7"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/I7:id', function (request, response) {
  fs.readFile('information7.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"7"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
}); 

/* 8호선 */
app.get('/M8:id', function (request, response) {
  fs.readFile('./public/html/8호선/M8'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"8"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/I8:id', function (request, response) {
  fs.readFile('information8.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"8"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
}); 

/* 9호선 */
app.get('/M9:id', function (request, response) {
  fs.readFile('./public/html/9호선/M9'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"9"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/I9:id', function (request, response) {
  fs.readFile('information9.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"9"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 분당선 */
app.get('/MB:id', function (request, response) {
  fs.readFile('./public/html/분당선/B'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"B"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/IB:id', function (request, response) {
  fs.readFile('informationB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"B"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

/* 신분당선 */
app.get('/MSB:id', function (request, response) {
  fs.readFile('./public/html/신분당선/SB'+request.params.id+'.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"SB"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/ISB:id', function (request, response) {
  fs.readFile('informationSB.html', 'utf8', function (error, data) {
    db.query('SELECT * FROM station where num=?',"SB"+[request.params.id], function (error, results) {
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});


