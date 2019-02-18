const request = require('supertest');

describe('/contact tests', () => {
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

    describe('GET /contact', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/contact')
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
