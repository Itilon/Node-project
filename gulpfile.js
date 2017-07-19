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

gulp.task('tests:integration', ['pre-test'], () => {
    return gulp.src([
        './test/integration/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});
