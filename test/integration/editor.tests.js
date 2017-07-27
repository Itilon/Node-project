/* eslint-disable consistent-return */
const request = require('supertest');

const connectionString = 'mongodb://localhost/test-db';
let app = null;
let server = null;

Promise.resolve()
    .then(() => require('../../db')(connectionString))
    .then((db) => require('../../data')(db))
    .then((data) => require('../../app')(data))
    .then((_app) => {
        app = _app;
        server = request.agent(app);
    });

describe('url that requires user to be logged in', () => {
    it('login', loginUser());
    it('GET /editor', (done) => {
        server
            .get('/editor')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('GET /dashboard', (done) => {
        server
            .get('/dashboard/59789394d7521c8a6c67c70f')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('GET /logout', (done) => {
        server
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


function loginUser() {
    return (done) => {
        server
            .post('/login')
            .send({ username: 'gosho', password: '1' })
            .expect(302)
            .expect('Location', '/dashboard/59789394d7521c8a6c67c70f')
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
}
