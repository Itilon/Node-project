const { expect } = require('chai');

const PostsData = require('../../../data/posts.data');

describe('Posts.data tests', () => {
    let items;
    let postsData;
    let db;
    let collection;
    let PostsClass = null;
//  eslint-disable-next-line no-undef
    const Post = null;
    beforeEach(() => {
        items = [];
        collection = {
            name: '',
            find() {
                return {
                    toArray() {
                        return Promise.resolve(items);
                    },
                    sort(constraint) {
                        return {
                            toArray() {
                                return Promise.resolve({
                                    sorted: true,
                                    items: items,
                                });
                            },
                        };
                    },
                };
            },
        };

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };

        PostsClass = class {

        };

        postsData = new PostsData(db, PostsClass, Post);
    });
    describe('Constructor tests', () => {
        it('Should init db properly', () => {
            expect(postsData.db).to.be.equal(db);
        });
    });
    describe('Method tests', () => {
        it('Filter by should return filtered data', () => {
            const expected = [1, 2, 3, 4];
            items.push(...expected);
            postsData.filterBy()
            .then((user) => {
                expect(user).to.equal(expected);
            });
        });
    });
});
