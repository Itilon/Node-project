const { Router } = require('express');

const latestArticlesNumber = 4;

const attach = (app, data) => {
    const router = new Router();

    router

        // Catching the favicon request:
        .get('/favicon.ico', function(req, res) {
            res.status(204);
        })

        .get('/', (req, res) => {
            return data.posts.getSome(latestArticlesNumber)
                .then((posts) => {
                    return data.categories.getAll()
                        .then((categories) => {
                            res.render('home', {
                                model: posts,
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

        /* .get('/items', (req, res) => {
            return data.posts.getAll()
                .then((posts) => {
                    return res.render('items/all', {
                        model: posts,
                    });
                });
        })

        .post('/items', (req, res) => {
            const item = req.body;
            return data.posts.create(item)
                .then((dbitem) => res.redirect('/items/' + dbitem.id));
        }) */

        .get('/post/:id', (req, res) => {
            const id = req.params.id;

            if (id.length !== 24) {
                return res.redirect('/404');
            }

            return data.posts.findById(id)
                .then((post) => {
                    if (!post) {
                        return res.redirect('/404');
                    }

                    return data.posts.getSome(latestArticlesNumber)
                        .then((posts) => {
                            return data.categories.getAll()
                                .then((categories) => {
                                    res.render('post', {
                                        post: post,
                                        model: posts,
                                        categories: categories,
                                    });
                                });
                        });
                });
        })

        .get('/category/:id', (req, res) => {
            const id = req.params.id;

            if (id.length !== 24) {
                return res.redirect('/404');
            }

            return data.categories.findById(id)
                .then((category) => {
                    if (!category) {
                        return res.redirect('/404');
                    }

                    return data.categories.getAll()
                        .then((categories) => {
                            return data.posts.getSome(latestArticlesNumber)
                                .then((posts) => {
                                    res.render('category', {
                                        category: category,
                                        model: posts,
                                        categories: categories,
                                    });
                                });
                            });
                });
        });

    app.use('/', router);
};

module.exports = attach;
