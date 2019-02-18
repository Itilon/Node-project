const request = require('supertest');

describe('/login tests', () => {
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

    describe('GET /login', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /dashboard', () => {
        it('expect to return 401', (done) => {
            request(app)
                .get('/dashboard/59789dfd72e1a339b05cb1f5')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /editor', () => {
        it('url that requires user to be logged in', (done) => {
            request(app)
                .get('/editor')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /logout', () => {
        it('should return 302', (done) => {
            request(app)
                .get('/logout')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
