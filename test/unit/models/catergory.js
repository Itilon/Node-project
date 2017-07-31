const { expect } = require('chai');

const Category = require('../../../models/category.model');


describe('User model tests', () => {
    it('isValid should return true when called with valid model', () => {
        const model = {
            name: 'SomeName',
        };
        const actual = Category.isValid(model);
        // eslint-disable-next-line no-unused-expressions
        expect(actual).to.be.true;
    });
});
