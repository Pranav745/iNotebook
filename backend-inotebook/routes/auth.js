const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewear/fetchuser');
const bcrypt = require("bcrypt");

const JWT_SECRET = "thisIsaJWTwebtoken1231"

// Route 1 :  creating new user on /api/auth/createuser ? without login
router.post('/createuser', [
    body('name', 'Enter Valid name').isLength({ min: 3 }),
    body('email', 'Enter Valid email').isEmail(),
    body('password', 'Password must be atleast 5 chars').isLength({ min: 5 }),
], async (req, res) => {

    // data validation using express-validator
    const result = validationResult(req);
    let success=false;
    
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }

    try {
        // check email already exits or not
        let user = await User.findOne({ email: req.body.email });

        if (user) {

            return res.status(400).json({success, error: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign( data, JWT_SECRET);
        success=true;
        res.json({ success, authToken })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("Some Error occured");
    }
})


// Route 2 :  login the user with correct details /api/auth/login


router.post('/login', [
    body('email', 'Enter Valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {

    let success  = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        // check email already exits or not
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({success , error: "Please try with correct credentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success  ,error: "Please try with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success   =true;
        res.json({success , authToken })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("Some Error occured while login");
    }
})


// Route 3 for fetching the user  /api/auth/getuser

router.post('/getuser', fetchuser, async (req, res) => {


    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("Internal Error");
    }
})


module.exports = router