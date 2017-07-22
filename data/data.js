const PostsData = require('./posts.data');
const CategoriesData = require('./categories.data');

const init = (db) => {
    return Promise.resolve({
        items: new PostsData(db),
        categories: new CategoriesData(db),
    });
};

module.exports = init;
