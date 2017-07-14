const express = require('express');

const init = (data) => {
    const app = express();

    const userData = require('../data');
    require('./config/app.config')(app);
    require('./config/auth.config')(app, userData);


    app.get('/404', (req, res) => {
        res.send('<h1>Error</h1>');
    });

    require('./routes')(app);

    app.get('/items', (req, res) => {
        return data.items.getAll()
            .then((items) => {
                return res.render('items/all', {
                    model: items,
                });
            });
    });

    app.post('/items', (req, res) => {
        const item = req.body;
        return data.items.create(item)
            .then((dbitem) => res.redirect('/items/' + dbitem.id));
    });

    return Promise.resolve(app);
};

module.exports = init;
