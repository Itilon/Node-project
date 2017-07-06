const express = require('express');

const app = express();

require('./config/app.config')(app);

app.get('/404', (req, res) => {
    res.send('<h1>Error</h1>');
});

require('./routes')(app);

module.exports = app;
