const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectID } = require('mongodb');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.findById()', () => {
    const db = {
        collection: () => { },
    };

    let ModelClass = null;
    const validator = null;
    let data = null;

    const findOne = () => {
        return {
            _id: new ObjectID('5979da75a7f73f19a8f97876'),
        };
    };

    describe('when there are items in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return items', () => {
                const result = data.findById('5979da75a7f73f19a8f97876');
                const size = Object.keys(result).length;
                        expect(size).to.equal(1);
            });
        });
    });
});
