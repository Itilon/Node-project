const BaseData = require('./base/base.data');
const Category = require('../models/category.model');

class CategoriesData extends BaseData {
    constructor(db) {
        super(db, Category);
    }
}

module.exports = CategoriesData;
