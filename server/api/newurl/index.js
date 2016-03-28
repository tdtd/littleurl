'use strict';

var express = require('express');
var controller = require('./newurl.controller');

var router = express.Router();

router.get('/newurl', controller.index);
router.get('/:id', controller.redirectURL);
router.get('/newurl/:url*', controller.newURL);

module.exports = router;
//# sourceMappingURL=index.js.map
