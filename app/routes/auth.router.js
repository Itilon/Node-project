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
            res.redirect(`/dashboard/${req.user._id}`);
        })

        .get('/dashboard/:id', (req, res) => {
            if (!req.isAuthenticated()) {
                res.redirect('404');
            }
            const user = req.user;

            res.render('dashboard', {
                user: user,
            });
        })

        .get('/editor', (req, res) => {
            if (!req.isAuthenticated()) {
                res.redirect('404');
            }
            const user = req.user;

            res.render('editor', {
                user: user,
            });
        })

        .get('/logout', (req, res) => {
            if (!req.isAuthenticated()) {
                res.redirect('404');
            }
            req.logout();
            res.redirect('login');
        })

        .post('/dashboard', (req, res) => {
            const post = req.body;
            const file = req.files.file;

            file.mv('./uploads/' + file.name);

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
