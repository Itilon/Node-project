const flash = require('connect-flash');
const { Router } = require('express');

const attach = (app, controllers) => {
    const router = new Router();

    const userController = controllers.userController;

    router
        .post('/signup', userController.signUp)

        .post('/login', userController.signIn)

        .get('/dashboard/:id', userController.getDashboard)

        .get('/profile', userController.getProfile)

        .get('/editor', userController.getEditor)

        .get('/articles', userController.getArticles)

        .get('/logout', userController.getLogout)

        .post('/delete', userController.postDelete)

        .post('/edit', userController.postEdit);

    app.use(flash());
    app.use('/', router);
};

module.exports = attach;
