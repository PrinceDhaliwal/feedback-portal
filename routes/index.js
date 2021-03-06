var express = require('express');
var router = express.Router();
const config = require('../src/ui/js/config');
const ServerError = require('./helpers/ServerError');

const redirectUri = process.env.SERVER_URL + ':3000';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Feedback Home', userId: 'null' });
});

/* GET redirect page */
router.get('/redirect', function(req, res, next) {
    res.render('redirect_handler', {
        title: 'Redirecting...'
    });
});

router.get('/results', function(req, res, next) {
    if (req.userRole !== 'ADMIN') {
        console.log("User was not admin");
        res.status(403).render('error', new ServerError(403, 'User was not admin', 'Please contact your admin.', ''));
        return;
    }
    res.render('results', {
        userId: req.userId,
        title: 'Admin Console'
    });
});

router.get(['/list', '/form'], function(req, res, next) {
    if (req.userRole !== 'STUDENT') {
        console.log("User was not student");
        res.status(403).send({
            error: 'You are not permitted to view this page',
            how: 'Please login to continue',
            link: 'http://' + process.env.SERVER_URL + ':3000/'
        });
        return;
    }

    res.render('list', {
        userId: req.userId,
        title: 'Feedback form'
    });
});

router.get('/logout', function(req, res, next) {
    res.cookie('FEEDBACK_CSSPEC', "");
    res.redirect(config.authApi.logout + '?redirect_uri=http://' + redirectUri);
});

module.exports = router;
