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

    describe('GET /1 - first post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/5976166988ea0320f0d4cbae')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /2 - second post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/5976167588ea0320f0d4cbb5')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /3 - third post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/5976167e88ea0320f0d4cbbb')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /4 - fourth post', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/5976168888ea0320f0d4cbc1')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /Category%201 - first Category', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/597618f088ea0320f0d4cd0f')
                .expect(302)
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
