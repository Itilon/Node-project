const BaseData = require('./base/base.data');
const Post = require('../models/post.model');
const { ObjectID } = require('mongodb');

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

    update(id, title, category, tags, content, author, date, url) {
        return this.collection
            // eslint-disable-next-line new-cap
            .update( { _id: ObjectID(id) },
            {
                title: title,
                category: category,
                tags: tags,
                content: content,
                author: author,
                date: date,
                url: url,
            }
        );
    }
}

module.exports = PostsData;
