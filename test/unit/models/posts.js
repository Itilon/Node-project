const { expect } = require('chai');

const Post = require('../../../models/post.model');

describe('User model tests', () => {
    it('isValid should return true when called with valid model', () => {
        const model = {
            title: 'SomeName',
            content: 'Something Random',
        };
        const actual = Post.isValid(model);
        // eslint-disable-next-line no-unused-expressions
        expect(actual).to.be.true;
    });
});
