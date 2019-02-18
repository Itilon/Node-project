class User {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            model.password.length > 10;
    }
}

module.exports = User;
