/* eslint-disable max-len */
const { expect } = require('chai');

const BaseData = require('../../../data/base/base.data');

describe('Base-data tests', () => {
    let baseData;
    let db;
    let ModelClass = null;
    let collection;
    let items;
    const validator = null;

    beforeEach(() => {
        items = [];

        collection = {
            name: '',
            find() {
                return {
                    toArray() {
                        return Promise.resolve(items);
                    },
                };
            },

            findOne(constraint) {
                const name = constraint.name;
                const item = items.find((el) => el === name);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
            },
        };

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };

        ModelClass = class {
                };

        baseData = new BaseData(db, ModelClass, validator);
    });
    describe('Method tests', () => {
                it('findByUsername - findOne should return collection item', (done) => {
            items = [
                'Gosho',
                'Pesho',
                'Metodii',
                'Alex',
            ];

            const expected = 'Pesho';

            baseData.findByName(expected)
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('findByUsername - findOne should return undefined if item does not exist', (done) => {
            items = [
                'Gosho',
                'Pesho',
                'Metodii',
                'Alex',
            ];

            const expected = 'Genadii';

            baseData.findByName(expected)
                .then((data) => {
                    expect(data).to.be.an('undefined');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
