const { Router } = require('express');

const items = [{
    name: 'Mira',
    id: 1,
}, {
    name: 'Viki',
    id: 2,
}, {
    name: 'Ira',
    id: 3,
}];

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.render('home');
        })

        .get('/about', (req, res) => {
            res.render('about');
        })

        .get('/login', (req, res) => {
            res.render('login');
        })

        .get('/contact', (req, res) => {
            res.render('contact');
        })

        .get('/all', (req, res) => {
            res.render('all', {
                model: items,
            });
        })

        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const item = items.find((i) => i.id === id);

            if (!item) {
                return res.redirect('/404');
            }
            return res.render('detail', {
                model: item,
            });
        });
    app.use('/', router);
};

module.exports = attach;
