const express = require('express');

const init = (data) => {
    const app = express();

    require('./config/app.config')(app, data);
    require('./config/auth.config')(app, data);

    app
        .get('/404', (req, res) => {
            res.render('404');
        })
        .get('/401', (req, res) => {
            res.render('401');
        });

    const controllers = require('../controllers')(data);
    require('./routes')(app, controllers);

    return Promise.resolve(app);
};

module.exports = init;
