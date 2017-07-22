const PostsData = require('./posts.data');
const CategoriesData = require('./categories.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        items: new PostsData(db),
        categories: new CategoriesData(db),
        users: new UsersData(db),
    });
};

module.exports = init;
