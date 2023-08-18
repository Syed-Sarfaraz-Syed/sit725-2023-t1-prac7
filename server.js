let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb+srv://s222599005:admin@cluster0.erjwf5v.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    collection = client.db().collection('Butterfly')
    console.log(collection);
  } catch (ex) {
    console.error(ex);
  }
}

// Assign port to 3000
port = 3000;

app.listen(port, () => {
  console.log("Web server running at: http://localhost:3000");
  run().catch(console.dir);
});

app.get('/', (request, response) => {
  response.render('index.html');
});

app.get('/api/butterfly', (req, res) => {
  getAllButterflies((err, result) => {
    if (!err) {
      res.json({ statusCode: 200, data: result, message: 'get all butterflies successful' });
    }
  });
});

app.post('/api/butterfly', (req, res) => {
  let butterfly = req.body;
  postButterfly(butterfly, (err, result) => {
    if (!err) {
      res.json({ statusCode: 201, data: result, message: 'success' });
    }
  });
});

function postButterfly(butterfly, callback) {
  collection.insertOne(butterfly, callback);
}

function getAllButterflies(callback) {
  collection.find({}).toArray(callback);
}


app.get('/add', (req, res) => {
  let status = 200;
  let message = 'success';
  let firstNumber = req.query.firstNumber;
  let secondNumber = req.query.secondNumber;
  let result = parseInt(firstNumber) + parseInt(secondNumber);
  res.json({
    status: status,
    message: message,
    data: result
  })

})









