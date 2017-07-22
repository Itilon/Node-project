const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return data.items.getAll()
                .then((items) => {
                    return res.render('home', {
                        model: items,
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
                        return res.redirect('/404');
                    }

                    return data.items.getAll()
                        .then((items) => {
                            res.render('post', {
                                model: items,
                                post: post,
                            });
                        });
                });

            /* if (!post) {
                id = req.params.id;
                post = posts.find((i) => i.category === id);

                if (!post) {
                    return res.redirect('/404');
                }
                const categoryPosts = [];
                posts.forEach((catPost) => {
                    if (catPost.category === id) {
                        categoryPosts.push(catPost);
                    }
                });
                return res.render('category', {
                    model: posts,
                    category: categoryPosts,
                });
            } */
        });
    app.use('/', router);
};

module.exports = attach;
