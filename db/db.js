const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    MongoClient.connect(connectionString);
};

module.exports = init;
