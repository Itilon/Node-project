const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server', () => {
    return require('./server');
});

gulp.task('dev', () => {
    return nodemon({
        ext: 'js',
        script: 'server.js',
    });
});

gulp.task('pre-test', () => {
    return gulp.src([
        './data/**/*.js',
        './app/**/*.js',
        './config/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/**/*.js',
        './test/integration/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});

const config = {
    connectionString: 'mongodb://localhost/test-db',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./db')(config.connectionString))
        .then((db) => require('./data')(db))
        .then((data) => require('./app')(data))
        .then((app) => {
            app.listen(config.port, () =>
                console.log(`Server starts at :${config.port}`));
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(config.connectionString);
});

gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src('./test/browser/**/*.js')
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 10000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});
