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
        })

        .get('/:tag', (req, res) => {
            const tag = req.params.tag;

            return data.posts.filterBy({ tags: tag })
                .then((taggedPosts) => {
                    if (!taggedPosts) {
                        return res.redirect('/404');
                    }

                    return data.categories.getAll()
                        .then((categories) => {
                            return data.posts.getSome(latestArticlesNumber)
                                .then((posts) => {
                                    res.render('tag', {
                                        tag: tag,
                                        taggedPosts: taggedPosts,
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
