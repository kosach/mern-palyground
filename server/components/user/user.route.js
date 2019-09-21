const express = require('express');
const { check, validationResult} = require('express-validator')
const router = express.Router();

const { createNewUser } = require('./user.service');

// @route POST api/users
// @desc Register user
// @access Public

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Wrong email ').isEmail(),
    check('password', 'Wrong password').isLength({min: 6}).isString()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    try{
        const token = await createNewUser(req.body)
        res.json({ token })
    }catch(err){
        console.error('Server error', err)
        res.status(400).json({ errors: [{ msg: err}] })
    }
});

module.exports = router;