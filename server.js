let express = require('express');
let app = express();

app.use(express.static(__dirname + '/'));

// Assign port to 3000
port = 3000;

app.listen(port, () => {
    console.log("Web server running at: http://localhost:3000");
});

app.get('/', (request, response) => {
    response.render('index.html');
});

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









