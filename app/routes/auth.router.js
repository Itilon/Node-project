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
                return res.redirect('/401');
            }
            const user = req.user;

            return res.render('dashboard', {
                user: user,
            });
        })

        .get('/editor', (req, res) => {
            if (!req.isAuthenticated()) {
                return res.redirect('/401');
            }
            const user = req.user;

            return res.render('editor', {
                user: user,
            });
        })

        .get('/logout', (req, res) => {
            if (!req.isAuthenticated()) {
                return res.redirect('/401');
            }
            req.logout();
            return res.redirect('/login');
        })

        .post('/edit', (req, res) => {
            const post = req.body;
            const userId = req.session.passport.user;
            // const file = req.files.file;
            // file.mv('./uploads/' + file.name);
            return data.users.findById(userId)
                .then((user) => {
                    post.author = user.username;
                    post.content = post.content.split('\r\n');
                    post.tags = post.tags.split(', ');

                    return data.posts.create(post)
                        .then((dbItem) => {
                            console.log(dbItem);
                            res.redirect('/editor');
                    });
                });
        });

    app.use(flash());
    app.use('/', router);
};

module.exports = attach;
