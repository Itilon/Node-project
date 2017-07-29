/* eslint-disable consistent-return, max-len */
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
            .get('/dashboard/597c6b198f1d031b5851c597')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
        it('GET /articles', (done) => {
        server
            .get('/articles')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Post /edit with not existing category', (done) => {
        server
            .post('/edit')
            .field('title', 'Something')
            .attach('file', 'static/images/image.jpg')
            .field('category', 'RandomD')
            .field('tags', 'Something1')
            .field('content', 'A brief')
            .expect(302)
            .expect('Location', '/editor')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Post /edit with existing category', (done) => {
        server
            .post('/edit')
            .field('title', 'Something')
            .attach('file', 'static/images/image.jpg')
            .field('category', 'Animals')
            .field('tags', 'Something1')
            .field('content', 'A brief')
            .expect(302)
            .expect('Location', '/editor')
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
            .expect('Location', '/login')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
    it('Post /signup', (done) => {
        server
            .post('/signup')
            .send({ username: 'gosheto', password: '123456' })
            .expect(302)
            .expect('Location', '/login')
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
            .send({ username: 'pesho', password: '123456' })
            .expect(302)
            .expect('Location', '/dashboard/597c6b198f1d031b5851c597')
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
}
