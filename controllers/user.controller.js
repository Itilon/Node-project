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
        res.render('login', { 'isAuthenticated': false });
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

    const getUpdate = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/401');
        }
        const user = req.user;
        const postId = req.params.id;

        return data.posts.findById(postId)
            .then((post) => {
                return res.render('update', {
                    user: user,
                    post: post,
                });
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

    const postUpdate = (req, res) => {
        const id = req.body.id;
        const title = req.body.title;
        const category = req.body.category;
        const tags = req.body.tags.split('\r\n');
        const content = req.body.content.split('\r\n');
        const author = req.body.author;
        const date = req.body.date;

        let url = req.body.url;

        const file = req.files.file;
        if (typeof(file) !== 'undefined') {
            file.mv('./static/images/' + file.name);
            url = '/static/images/' + file.name;
        }

        return data.posts
            .update(id, title, category, tags, content, author, date, url)
            .then(() => {
                return data.users.findByUsername(author)
                    .then((user) => {
                        const userId = user._id;
                        return data.users.pullById(userId, id)
                            .then(() => {
                                const article = {};
                                article._id = id;
                                article.title = title;
                                article.content = content[0];
                                article.url = url;
                                return data.users
                                    .updateById(user, article)
                                    .then(() => {
                                        return data.categories
                                            .pullById(userId, id)
                                            .then(() => {
                                                return data.categories
                                                    .updateById(user, article)
                                                    .then(() => {
                                                        res
                                                        .redirect('/articles');
                                                    });
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
        getUpdate,
        getLogout,
        postEdit,
        postUpdate,
        postDelete,
    };
};
