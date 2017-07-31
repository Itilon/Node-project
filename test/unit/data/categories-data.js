const { expect } = require('chai');

const CategoriesData = require('../../../data/categories.data');

describe('Categories.data tests', () => {
    let categoryData;
    let db;
    let collection;
    let CategoryClass = null;
//  eslint-disable-next-line no-undef
    const Category = null;
    beforeEach(() => {
        collection = {};

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };

        CategoryClass = class {

        };

        categoryData = new CategoriesData(db, CategoryClass, Category);
    });
    describe('Constructor tests', () => {
        it('Should init db properly', () => {
            expect(categoryData.db).to.be.equal(db);
        });
    });
});
