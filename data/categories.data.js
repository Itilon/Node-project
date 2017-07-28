const BaseData = require('./base/base.data');
const Category = require('../models/category.model');

class CategoriesData extends BaseData {
    constructor(db) {
        super(db, Category);
    }

    updateById(model, value) {
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
