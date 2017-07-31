const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const UsersData = require('../../../data/users.data');

describe('Users.data tests', () => {
    let userData;
    let db;
    let items;
    let collection;
    let UserClass = null;
    //  eslint-disable-next-line no-undef
    const User = null;
    beforeEach(() => {
        items = [];
        collection = {};

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
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
            updateOne(model, value) {
                Promise.resolve(items);
            },
        };
        UserClass = class {

        };

        userData = new UsersData(db, UserClass, User);
    });
    describe('Constructor tests', () => {
        it('Should init db properly', () => {
            expect(userData.db).to.be.equal(db);
        });
    });
    describe('Mehods tests', () => {
        describe('CheckPassword Tests', () => {
            it('Should return user from the collection', (done) => {
                const user1 = {
                    username: 'gosho',
                    password: '123456',
                };
                const user2 = {
                    username: 'pesho',
                    password: '123456',
                };

                items.push(user1, user2);
                userData.checkPassword(user1.username, '123456')
                    .then((user) => {
                        expect(user).to.equal(true);
                        done();
                    })
                    .catch((error) => {
                        done(error);
                    });
            });
            it('Should throw when called with invalid password', (done) => {
                const user1 = {
                    username: 'gosho',
                    password: '123456',
                };
                const user2 = {
                    username: 'pesho',
                    password: '123456',
                };

                items.push(user1, user2);
                userData.checkPassword('gosho', 'random')
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid password');
                    done();
                });
            });
            it('Should throw when called with invalid password', (done) => {
                userData.checkPassword('nqkoii', 'random')
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid user');
                    done();
                });
            });
        });
    });
});
