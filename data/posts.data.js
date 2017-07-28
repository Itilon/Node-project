const BaseData = require('./base/base.data');
const Post = require('../models/post.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }

    _isModelValid(model) {
        // maybe custom validation
        return super._isModelValid(model);
    }

    filterBy(props) {
        return this.collection.find(props)
            .sort({ _id: -1 })
            .toArray();
    }
}

module.exports = PostsData;
