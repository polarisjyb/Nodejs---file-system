const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 6789;

const app = http.createServer((req, res) => {

  const head = fs.readFileSync('head.txt', 'utf-8');
  const body = fs.readFileSync('body.txt', 'utf-8');
  const header = fs.readFileSync('header.txt', 'utf-8');
  const main = fs.readFileSync('main.txt', 'utf-8');
  const footer = fs.readFileSync('footer.txt', 'utf-8');

  const bodyInnerhtml = header + '\n' + main + '\n' + footer; 
  fs.writeFileSync('body.txt', bodyInnerhtml, {encoding: 'utf-8'});

  fs.readFile('body.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    // console.log(data)
  });

  const htmlInner = head + '\n' + body;
  fs.writeFileSync('html.txt', htmlInner, {encoding: 'utf-8'});

  
  fs.readFile('html.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write(data);
    res.end();
    
  });

  
  // fs.readFile('html.txt', 'utf-8', (err, data) => {
  //   if(err) throw err;
    
  // });
// });

});

app.listen(port, (err) => {
  if (err) throw err;
  console.log('서버 가동 중');
});