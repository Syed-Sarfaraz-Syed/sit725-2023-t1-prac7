let express = require('express');
let app = express();
let port = process.env.port || 3000;
let router = require('./routes/router');
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);


app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/butterfly', router);

io.on('connection',(socket)=>{
  console.log('something');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });

  setInterval(()=>{
      socket.emit('number', parseInt(Math.random()*10));
  }, 1000)
});

http.listen(port, () => {
  console.log("Web server running at: http://localhost:3000");
});

app.get('/', (request, response) => {
  response.render('index.html');
});

