const { Router } = require('express');

const attach = (app, controllers) => {
    const router = new Router();

    const postController = controllers.postController;
    router
        .get('/categories', postController.getCategories);

    app.use('/api', router);
};

module.exports = attach;
