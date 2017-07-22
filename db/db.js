const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log(`Connected to database: ${db.databaseName}`);
            return db;
        });
};

module.exports = init;
