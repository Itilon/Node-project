module.exports = (data) => {
    const getHome = (req, res) => {
        const latestArticlesNumber = 8;
        data.posts.getSome(latestArticlesNumber)
            .then((posts) => {
                const olderPosts = posts.splice(4, 4);

                return data.categories.getAll()
                    .then((categories) => {
                        res.render('home', {
                            model: posts,
                            olderPosts: olderPosts,
                            categories: categories,
                        });
                    });
            });
    };

    const getAbout = (req, res) => {
        res.render('about');
    };

    const getLogin = (req, res) => {
        res.render('login');
    };

    const getContact = (req, res) => {
        res.render('contact');
    };

    const getPostById = (req, res) => {
        const id = req.params.id;
        const latestArticlesNumber = 4;
        if (id.length !== 24) {
            return res.redirect('/404');
        }

        return data.posts.findById(id)
            .then((post) => {
                if (!post) {
                    return res.redirect('/404');
                }

                return data.posts.getSome(latestArticlesNumber)
                    .then((posts) => {
                        return data.categories.getAll()
                            .then((categories) => {
                                res.render('post', {
                                    post: post,
                                    model: posts,
                                    categories: categories,
                                });
                            });
                    });
            });
    };


    const getCategoryById = (req, res) => {
        const id = req.params.id;
        const latestArticlesNumber = 4;
        if (id.length !== 24) {
            return res.redirect('/404');
        }

        return data.categories.findById(id)
            .then((category) => {
                if (!category) {
                    return res.redirect('/404');
                }

                return data.categories.getAll()
                    .then((categories) => {
                        return data.posts.getSome(latestArticlesNumber)
                            .then((posts) => {
                                res.render('category', {
                                    category: category,
                                    model: posts,
                                    categories: categories,
                                });
                            });
                    });
            });
    };

    const getAuthorByName = (req, res) => {
        const author = req.params.author;
        const latestArticlesNumber = 4;
        return data.users.findByUsername(author)
            .then((foundAuthor) => {
                if (!foundAuthor) {
                    return res.redirect('/404');
                }

                return data.categories.getAll()
                    .then((categories) => {
                        return data.posts.getSome(latestArticlesNumber)
                            .then((posts) => {
                                res.render('author', {
                                    author: foundAuthor,
                                    authorPosts: foundAuthor.posts,
                                    model: posts,
                                    categories: categories,
                                });
                            });
                    });
            });
    };

    const getSearch = (req, res) => {
        const searchTerm = req.query.search;
        const latestArticlesNumber = 4;
        return data.posts
            .filterBy(
            { title: { '$regex': searchTerm, '$options': 'i' } }
            )
            .then((results) => {
                return data.posts
                    .filterBy(
                    { content: { '$regex': searchTerm, '$options': 'i' } }
                    )
                    .then((postsFound) => {
                        if (results.length === 0 && postsFound.length === 0) {
                            return res.redirect('/404');
                        }

                        return data.categories.getAll()
                            .then((categories) => {
                                return data.posts
                                    .getSome(latestArticlesNumber)
                                    .then((posts) => {
                                        res.render('search', {
                                            searchTerm: searchTerm,
                                            results: results,
                                            postsFound: postsFound,
                                            model: posts,
                                            categories: categories,
                                        });
                                    });
                            });
                    });
            });
    };

    const getTag = (req, res) => {
        const tag = req.params.tag;
        const latestArticlesNumber = 4;

        return data.posts.filterBy({ tags: tag })
            .then((taggedPosts) => {
                if (!taggedPosts) {
                    return res.redirect('/404');
                }

                return data.categories.getAll()
                    .then((categories) => {
                        return data.posts.getSome(latestArticlesNumber)
                            .then((posts) => {
                                res.render('tag', {
                                    tag: tag,
                                    taggedPosts: taggedPosts,
                                    model: posts,
                                    categories: categories,
                                });
                            });
                    });
            });
    };

    const getCategories = (req, res) => {
        return data.categories.getAll()
            .then((cats) => {
                return res.send(cats);
            });
    };

    return {
        getHome,
        getAbout,
        getLogin,
        getContact,
        getPostById,
        getCategoryById,
        getAuthorByName,
        getSearch,
        getTag,
        getCategories,
    };
};
