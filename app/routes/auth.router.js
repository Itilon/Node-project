var flash = require('connect-flash');
const passport = require('passport');
const { Router } = require('express');

const attach = (app) => {
    const router = new Router();

   router
    .post('/login',
        passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true 
        })
    );
    
    app.use(flash());
    app.use('/', router);
};

module.exports = attach;
