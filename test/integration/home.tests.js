const request = require('supertest');

describe('/home tests', () => {
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
                .get('/1')
                .expect(200)
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
                .get('/2')
                .expect(200)
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
                .get('/3')
                .expect(200)
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
                .get('/4')
                .expect(200)
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
                .get('/Category%201')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /Category%202 - second Category', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/Category%202')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /Category%203 - third Category', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/Category%203')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

   describe('GET Invalid route to redirect', () => {
       it('expect to return 302', (done) => {
           request(app)
               .get('/contanct1')
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
