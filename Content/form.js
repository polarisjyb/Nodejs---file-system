const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.PORT || 6789;

const app = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;

  if (req.method === 'GET') {
    if ( path === '/' ) {
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      fs.readFile(__dirname + '/main.html', (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    } else if ( path === '/about') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      fs.readFile(__dirname + '/about.html', (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    } else if ( path === '/form') {
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      fs.readFile(__dirname + '/form.html', (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    } else if ( path === '/submit') {
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      
    } else {
      res.statusCode = 404;
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end('유효하지 않은 경로입니다.');
    }
  }
  else if (req.method === 'POST') {
    if ( path === '/submit') {
      let body = '';
      req.on('data', (data) => {
        // body = body + data;
        body += decodeURI(data);
        // console.log(body)
      });
      req.on('end', ()=> {
        // console.log(typeof body);
        // console.log(body);
        // console.log(body.split('&'));
        let name = body.split('&')[0].split('=')[1];
        let hobby = body.split('&')[1].split('=')[1];
        let like = body.split('&')[2].split('=')[1];
        fs.writeFile(`${name}.txt`, hobby, 'utf8',(err) => {
          if (err) throw err;
          res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
          res.write(`이름: ${name}, 취미: ${hobby}, 좋아하는 것: ${like}`);
          res.end();
        });
      });
    } else {
      res.writeHead(404);
      res.end('fail');
    };
  };
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`${port}로 가동된 서버입니다.`);
});

// URI는 특정 리소스를 식별하는 통합 자원 식별자 (Uniform Resource Identifier)를 의미한다.
// URL은 흔히 웹 주소라고도 하며, 컴퓨터 네트워크 상에서 리소스가 어디 있는지 알려주기 위한 규약이다.
// URI는 식별하고 URL은 위치를 가리킨다.
// encodeURI - URI를 전달할 때 문제가 없도록 인코딩, 어떤 네트워크에서도 사용할 수 있게 문자를 코드(ASCll, 유니코드 등)로 변환하는 것
// escape - URI로 데이터를 전달하기 위해서 문자열을 인코딩

// dencodeURI - encodeURI를 통해서 만들어진 URI 이스케이핑을 디코드