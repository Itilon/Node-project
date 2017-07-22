const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, modelClass) {
        this.db = db;
        this.modelClass = modelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
}

    getAll() {
        const filter = {};
        const options = {};
        return this.collection.find(filter, options)
            .toArray();
    }

    create(model) {
        return this.collection.insert(model);
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model._id,
        }, model);
    }

    _getCollectionName() {
       return this.modelClass.name.toLowerCase() + 's';
    }
}
module.exports = BaseData;
