const { expect } = require('chai');

const User = require('../../../models/user.model');

describe('User model tests', () => {
    it('isValid should return true when called with valid model', () => {
        const model = {
            username: 'SomeName',
            password: 'Random Password',
        };
        const actual = User.isValid(model);
        // eslint-disable-next-line no-unused-expressions
        expect(actual).to.be.true;
    });
});
