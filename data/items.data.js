const BaseData = require('./base/base.data');
const Item = require('../models/items.model');

class ItemsData extends BaseData {
    constructor(db) {
        super(db, Item);
    }
}

module.exports = ItemsData;
