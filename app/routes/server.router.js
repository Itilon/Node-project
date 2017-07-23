const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return data.items.getAll()
                .then((items) => {
                    return data.categories.getAll()
                        .then((categories) => {
                            res.render('home', {
                                model: items,
                                categories: categories,
                            });
                        });
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

        .get('/items', (req, res) => {
            return data.items.getAll()
                .then((items) => {
                    return res.render('items/all', {
                        model: items,
                    });
                });
        })

        .post('/items', (req, res) => {
            const item = req.body;
            return data.items.create(item)
                .then((dbitem) => res.redirect('/items/' + dbitem.id));
        })

        .get('/:id', (req, res) => {
            const id = req.params.id;
            return data.items.findById(id)
                .then((post) => {
                    if (!post) {
                        return data.categories.findById(id)
                            .then((category) => {
                                if (!category) {
                                    return res.redirect('/404');
                                }
                                return data.categories.getAll()
                                    .then((categories) => {
                                        return data.items.getAll()
                                            .then((items) => {
                                                res.render('category', {
                                                    category: category,
                                                    model: items,
                                                    categories: categories,
                                                });
                                            });
                                    });
                            });
                    }

                    return data.items.getAll()
                        .then((items) => {
                            return data.categories.getAll()
                                .then((categories) => {
                                    res.render('post', {
                                        post: post,
                                        model: items,
                                        categories: categories,
                                    });
                                });
                        });
                });
        });

    app.use('/', router);
};

module.exports = attach;
