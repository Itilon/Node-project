/* eslint-disable max-len */
const request = require('supertest');

describe('/home tests', () => {
    const connectionString = 'mongodb://localhost/test-db';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db')(connectionString))
            .then((db) => require('../../data')(db))
            .then((data) => require('../../app')(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /home', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET - first post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/post/59789024d7521c8a6c67c46a')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET - second post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/post/5978902ad7521c8a6c67c46f')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET - third post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/post/59789033d7521c8a6c67c476')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET - fourth post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/post/5978903ad7521c8a6c67c47b')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('expect to redirect to /404 when called with invalid id', (done) => {
            request(app)
                .get('/post/5978903ad7521c8a6c67c47')
                .expect(302)
                .expect('Location', '/404')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('expect to redirect to /404 when called with invalid id', (done) => {
            request(app)
                .get('/post/5978903ad7521c8a6c67c711')
                .expect(302)
                .expect('Location', '/404')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    it('get /author', (done) => {
        request(app)
            .get('/author/pesho')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('get /author with invalid name', (done) => {
        request(app)
            .get('/author/pesho123')
            .expect(302)
            .expect('Location', '/404')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('get /articles when not logged in should redirect to /401', (done) => {
        request(app)
            .get('/articles')
            .expect(302)
            .expect('Location', '/401')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    describe('GET /tags', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/tags')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /categories - first Category', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/category/597afc1796459dd18951e326')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('expect to return 302 when called with invalid id', (done) => {
            request(app)
                .get('/category/597afc1796459dd18951e32')
                .expect(302)
                .expect('Location', '/404')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('expect to redirect to /404 when the category does not exist', (done) => {
            request(app)
                .get('/category/597afc1796459dd18951e896')
                .expect(302)
                .expect('Location', '/404')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /categories', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/categories')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /search', () => {
        it('expect to redirect to /404 when called with invalid data', (done) => {
            request(app)
                .get('/search?search=rhythms')
                .expect(302)
                .expect('Location', '/404')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('expect to return 200 when called with existing data', (done) => {
            request(app)
                .get('/search?search=first')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /404', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/404')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
