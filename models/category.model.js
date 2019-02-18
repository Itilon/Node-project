class Category {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.name === 'string';
    }
}

module.exports = Category;
