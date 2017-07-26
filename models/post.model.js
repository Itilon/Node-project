class Post {
    static isValid(model) {
        return typeof model !== 'undefined' &&
        typeof model.title === 'string' &&
        model.text.length > 3;
    }
}

module.exports = Post;
