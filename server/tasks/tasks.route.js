const express = require('express');
const router = express.Router();


// @route GET api/tasks
// @desc Test router
// @access Public
router.get('/', (req, res)=> res.send('Task router'));

module.exports = router;