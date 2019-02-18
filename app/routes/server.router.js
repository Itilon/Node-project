/* eslint-disable max-len */
const { Router } = require('express');

const attach = (app, controllers) => {
    const router = new Router();

    const postController = controllers.postController;
    const userController = controllers.userController;
    router

        // Catching the favicon request:
        .get('/favicon.ico', function(req, res) {
            res.status(204);
        })

        .get('/', postController.getHome)

        .get('/about', postController.getAbout)

        .get('/login', userController.login)

        .get('/contact', postController.getContact)

        .get('/post/:id', postController.getPostById)

        .get('/category/:id', postController.getCategoryById)

        .get('/author/:author', postController.getAuthorByName)

        .get('/search', postController.getSearch)

        .get('/:tag', postController.getTag);

    app.use('/', router);
};

module.exports = attach;
