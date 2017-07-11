class BaseData {
    constructor(db, modelClass) {
        this.db = db;
        this.modelClass = modelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }
    getAll() {
        const filter = {};
        const options = {};
        return this.collection.find(filter, options).toArray();
    }

    create(model) {
        return this.collection.insert(model);
    }

    _getCollectionName() {
       return this.modelClass.name.toLowerCase() + 's';
    }
}
module.exports = BaseData;
