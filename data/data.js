const PostsData = require('./posts.data');

const init = (db) => {
    return Promise.resolve({
        items: new PostsData(db),
    });
};

module.exports = init;
