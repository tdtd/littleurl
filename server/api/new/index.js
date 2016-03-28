'use strict';

var express = require('express');
var controller = require('./new.controller');

var router = express.Router();

router.get('/new/', controller.index);
router.get('/:id', controller.redirectURL);
router.get('/new/:url*', controller.newURL);
/*
router.post('/:id', controller.test);
*/
module.exports = router;
//# sourceMappingURL=index.js.map
