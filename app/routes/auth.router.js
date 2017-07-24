const flash = require('connect-flash');
const passport = require('passport');
const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();

    router
        .post('/login',
            passport.authenticate('local', {
                failureRedirect: '/login',
                failureFlash: true,
        }), (req, res) => {
            res.redirect(`/dashboard/:${req.user._id}`);
        })

        .get('/dashboard/:id', (req, res) => {
            res.render('dashboard');
        })

        .post('/dashboard', (req, res) => {
            const post = req.body;

            post.content = post.content.split('\r\n');

            return data.items.create(post)
                .then((dbItem) => {
                    console.log(dbItem);
                });
        });

    app.use(flash());
    app.use('/', router);
};

module.exports = attach;
