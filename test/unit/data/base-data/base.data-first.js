const { expect } = require('chai');

const BaseData = require('../../../../data/base/base.data');

describe('Base-data tests', () => {
    let baseData;
    let db;
    let ModelClass = null;
    let collection;
    let items;
    let validator;

    beforeEach(() => {
        items = [];
        validator = {
            isValid() {
                return true;
            },
        };

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
                const id = constraint._id.toString();
                const item = items.find((el) => el === id);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
            },

            remove(constraint) {
                const id = constraint._id.toString();
                const item = items.slice((el) => el === id);
                return Promise.resolve(item);
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
    describe('Constructor tests', () => {
        it('Should init db property', () => {
            expect(baseData.db).to.be.equal(db);
        });

        it('Should init collection name property', () => {
            // eslint-disable-next-line max-len
            expect(baseData.collectionName).to.be.equal(ModelClass.name.toLowerCase() + 's');
        });

        it('Should init collection property', () => {
            // eslint-disable-next-line max-len
            expect(baseData.collection).to.be.equal(collection);
            // eslint-disable-next-line max-len
            expect(baseData.collection.name).to.be.equal(ModelClass.name.toLowerCase() + 's');
        });
    });
    describe('Method tests', () => {
        it('getAll should return collection data', (done) => {
            const expected = [1, 2, 3, 4];
            items.push(...expected);
            baseData.getAll()
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
        it('filteyBy should return collection data', (done) => {
            const expected = [1, 2, 3, 4];
            items.push(...expected);
            baseData.filterBy()
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('findOne should return collection item', (done) => {
            items = [
                '5906f669b04a7f1dd47d7a31',
                '5906f669b04a7f1dd47d7a32',
                '5906f669b04a7f1dd47d7a33',
                '5906f669b04a7f1dd47d7a34',
                '5906f669b04a7f1dd47d7a35',
            ];

            const expected = '5906f669b04a7f1dd47d7a34';

            baseData.findById(expected)
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('create should add element to the collection', () => {
            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.create(expected);

            expect(items).to.be.deep.equal([expected]);
        });

        it('create should add element to the collection', () => {
            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.create(expected);

            expect(items).to.be.deep.equal([expected]);
        });

        it('remove should remove an ellement from the collection', () => {
            items = [
                '5906f669b04a7f1dd47d7a31',
                '5906f669b04a7f1dd47d7a32',
                '5906f669b04a7f1dd47d7a33',
                '5906f669b04a7f1dd47d7a34',
                '5906f669b04a7f1dd47d7a35',
            ];

            const expected = '5906f669b04a7f1dd47d7a31';
            baseData.deleteById(expected)
                .then((item) => {
                    expect(item.length).to.equal(4);
                });
        });
        it('isModelValid should validate', () => {
            const model = {
                name: 'Random',
                category: 'Random',
            };

           const validModel = baseData._isModelValid(model);
            expect(validModel).to.equal(true);
        });
});
});
