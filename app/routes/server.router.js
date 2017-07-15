const { Router } = require('express');

const items = [{
    title: 'First Article Title',
    url: 'http://e-lect.net/wp-content/uploads/2015/06/Time-to-Get-Perfect.jpg',
    id: 1,
}, {
    title: 'Second Article Title',
    url: 'http://e-lect.net/wp-content/uploads/2015/06/Smart-Training.jpg',
    id: 2,
}, {
    title: 'Third Article Title',
    url: 'http://e-lect.net/wp-content/uploads/2016/08/Millionaire.jpg',
    id: 3,
}];

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.render('home', {
                model: items,
            });
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
