const express = require('express');
const router = express.Router();


// @route POST api/users
// @desc Register user
// @access Public
router.post('/', (req, res) => {
console.log('TCL: req', req.body)
    res.send('User router');
});

module.exports = router;