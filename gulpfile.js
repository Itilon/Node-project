/* globals process */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3001;

gulp.task('server', () => {
    const async = () => {
        return Promise.resolve();
    };

    async()
        .then((data) => require('./app')(data))
        .then((app) => {
            app.listen(port, () => console.log(`Server starts at :${port}`));
        });
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'server.js',
    });
});
