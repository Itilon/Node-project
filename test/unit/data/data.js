const { expect } = require('chai');

const collection = {
};

const db = {
    collection(collectionName) {
        collection.name = collectionName;
        return collection;
    },
};

describe('Data tests', () => {
    it('Expect data to property posts', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('posts');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('Expect data to have property categories', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('categories');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('Expect data to have property users', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('users');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
