const passport = require('passport');

module.exports = (data) => {
    const signUp = (req, res) => {
        const user = req.body;

        user.posts = [];

        return data.users.create(user)
            .then((dbItem) => {
                console.log(dbItem);
                res.redirect('/login');
            });
    };

    const login = (req, res) => {
        res.render('login', { 'isAutenticated': false });
    };

    const signIn = (req, res, next) => {
        const auth = passport.authenticate('local', (error, user) => {
            if (error) {
                next(error);
                return;
            }

            req.login(user, (e) => {
                if (e) {
                    next(e);
                    return;
                }

                res.redirect(`/dashboard/${req.user._id}`);
            });
        });

        auth(req, res, next);
    };

    const getDashboard = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/401');
        }
        const user = req.user;

        return res.render('dashboard', {
            user: user,
        });
    };

    const getProfile = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/401');
        }
        const user = req.user;

        return res.render('profile', {
            user: user,
        });
    };

    const getEditor = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/401');
        }
        const user = req.user;

        return res.render('editor', {
            user: user,
        });
    };

    const getArticles = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/401');
        }
        const user = req.user;

        return res.render('articles', {
            user: user,
        });
    };

    const getLogout = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/401');
        }
        req.logout();
        return res.redirect('/login');
    };

    const postEdit = (req, res) => {
        const post = req.body;
        const userId = req.session.passport.user;
        const file = req.files.file;
        const currentDate = new Date;
        const month = [];
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        const date = `${month[currentDate.getMonth()]} 
                        ${currentDate.getDate()}, 
                        ${currentDate.getFullYear()}`;
        file.mv('./static/images/' + file.name);
        return data.users.findById(userId)
            .then((user) => {
                post.author = user.username;
                post.content = post.content.split('\r\n');
                post.tags = post.tags.split(', ');
                post.url = '/static/images/' + file.name;
                post.date = date;

                return data.posts.create(post)
                    .then((dbItem) => {
                        return data.categories
                            .findByName(dbItem.ops[0].category)
                            .then((category) => {
                                if (!category) {
                                    const cat = {};
                                    cat.name = dbItem.ops[0].category;
                                    cat.articles = [];
                                    const article = {};
                                    article._id = dbItem.ops[0]._id;
                                    article.title = dbItem.ops[0].title;
                                    article.content = dbItem.ops[0]
                                        .content[0];
                                    article.url = dbItem.ops[0].url;
                                    cat.articles.push(article);

                                    return data.categories.create(cat)
                                        .then(() => {
                                            return data.users
                                                .updateById(user, article)
                                                .then(() => {
                                                    res.redirect('/editor');
                                                });
                                        });
                                }

                                const article = {};
                                article._id = dbItem.ops[0]._id;
                                article.title = dbItem.ops[0].title;
                                article.content = dbItem.ops[0].content[0];
                                article.url = dbItem.ops[0].url;
                                return data.categories
                                    .updateById(category, article)
                                    .then(() => {
                                        return data.users
                                            .updateById(user, article)
                                            .then(() => {
                                                res.redirect('/editor');
                                            });
                                    });
                            });
                    });
            });
    };

    const postDelete = (req, res) => {
        const id = req.body.id;
        const userId = req.user._id;
        return data.posts.findById(id)
            .then((post) => {
                const category = post.category;

                return data.users.pullById(userId, id)
                    .then(() => {
                        return data.categories.pullById(category, id)
                        .then(() => {
                            return data.posts.deleteById(id)
                                .then(() => {
                                    res.redirect('/articles');
                                });
                        });
                    });
            });
    };

    return {
        signUp,
        login,
        signIn,
        getDashboard,
        getProfile,
        getEditor,
        getArticles,
        getLogout,
        postEdit,
        postDelete,
    };
};
