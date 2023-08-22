let collection = require('../model/butterfly');

function postButterfly(req, res) {
    let butterfly = req.body;
    collection.postButterfly(butterfly, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'success' });
        }
    });
}

function getAllButterflies(req, res) {
    collection.getAllButterflies((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'success' });
        }
    });
}

module.exports = { postButterfly, getAllButterflies }