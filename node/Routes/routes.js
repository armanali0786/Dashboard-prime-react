const router = require('express').Router();
const controller = require('../Controller/controller');

router.get('/users',controller.getFetchDataUser);

module.exports = router;