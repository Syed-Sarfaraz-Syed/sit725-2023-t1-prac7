let express = require('express');
let app = express();
let port = process.env.port || 3000;
let router = require('./routes/router');


app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/butterfly',router);


app.listen(port, () => {
  console.log("Web server running at: http://localhost:3000");
});

app.get('/', (request, response) => {
  response.render('index.html');
});

