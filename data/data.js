// const fs = require('fs');
// const path = require('path');

const PostsData = require('./posts.data');
const CategoriesData = require('./categories.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        posts: new PostsData(db),
        categories: new CategoriesData(db),
        users: new UsersData(db),
    });
};

// const init = (db) => {
//     fs.readdirSync(__dirname)
//         .filter((file) => file.includes('.data'))
//         .map((file) => path.join(__dirname, file))
//         .forEach((model) => {
//             const ModelsData = require(model);
//             return Promise.resolve({
//                 items: new ModelsData(db),
//             });
//         });
// };
module.exports = init;
