const BaseData = require('./base/base.data');
const Category = require('../models/category.model');
const { ObjectID } = require('mongodb');

class CategoriesData extends BaseData {
    constructor(db) {
        super(db, Category, Category);
    }

    pullById(category, id) {
        return this.collection
            .updateOne( { name: category },
                // eslint-disable-next-line new-cap
                { $pull: { articles: { _id: ObjectID(id) } } } );
    }

    updateById(model, value) {
        // eslint-disable-next-line new-cap
        value._id = ObjectID(value._id);

        return this.collection.updateOne(
            { _id: model._id },
            { $push:
                {
                    articles:
                    {
                        $each: [value],
                        $position: 0,
                    },
                },
            },
            model);
    }
}

module.exports = CategoriesData;
