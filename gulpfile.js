const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const { port, connectionString } = require('./app/config/port.config');

gulp.task('server', () => {
    const async = () => {
        return Promise.resolve();
    };

    async()
        //.then(() => require('./db')(connectionString))
        //.then((db) => require('./data')(db))
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
