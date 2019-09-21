const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { auth } = require('../../middleware')
const { getUserById, authenticateUser } = require('./user.service')

// @route GET api/users/auth
// @desc Get User info (just for check)
// @access Private
router.get('/', auth, async (req, res) => {
    try{
        const user = await getUserById(req.user.id);
        res.json(user);
    }catch(err){
        console.log('TCL: err', err.message)
        res.status(500).send('Server Error');
    }
});

// @route POST api/users/auth
// @desc Authenticate user and get token
// @access Public

router.post('/', [
    check('email', 'Wrong email ').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const token = await authenticateUser(req.body)
        res.json({ token })
    } catch (err) {
        console.error('Server error', err)
        res.status(400).json({ errors: [{ msg: err }] })
    }
});

module.exports = router;