let client = require('../dbConnection');
let collection = client.db().collection('Cats');

function postButterfly(butterfly, callback) {
    collection.insertOne(butterfly,callback);
}

function getAllButterflies(callback) {
    collection.find({}).toArray(callback);
}

module.exports = {postButterfly,getAllButterflies}