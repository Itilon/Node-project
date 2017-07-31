class Post {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.title === 'string' &&
            model.content.length > 3;
    }
}

module.exports = Post;
