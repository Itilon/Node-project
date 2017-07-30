const flash = require('connect-flash');
const { Router } = require('express');

const attach = (app, controllers) => {
    const router = new Router();

    const userController = controllers.userController;
    router
        .post('/signup', userController.signUp)

        .post('/login', userController.signIn)

        .get('/dashboard/:id', userController.getDashboard)

        .get('/editor', userController.getEditor)

        .get('/articles', userController.getArticles)

        .get('/logout', userController.getLogout)

        .post('/edit', userController.postEdit)

        .post('/delete', userController.postDelete);

    app.use(flash());
    app.use('/', router);
};

module.exports = attach;
