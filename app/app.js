const express = require('express');

const init = (data) => {
    const app = express();

    require('./config/app.config')(app, data);
    require('./config/auth.config')(app, data);

   app.use((req, res, next) => {
       console.log('---Current user---');
       console.log(req.user);
       next();
   });

    app.get('/404', (req, res) => {
        res.render('404');
    });

    require('./routes')(app, data);

    return Promise.resolve(app);
};

module.exports = init;
