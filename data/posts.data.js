const BaseData = require('./base/base.data');
const Post = require('../models/posts.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post);
    }
}

module.exports = PostsData;
