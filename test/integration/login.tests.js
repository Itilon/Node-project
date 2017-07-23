const request = require('supertest');

describe('/login tests', () => {
    const connectionString = 'mongodb://localhost/db-test';
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
    describe('POST /login', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/login')
                .send({ username: 'Gosho', password: '1' })
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
