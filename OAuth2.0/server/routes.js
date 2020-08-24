const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/login', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../src/login.html'));
})

router.get('/google', (req, res) => {
    return res.send('logging in with google');
})

router.get('/logout', (req, res) => {
    return res.send('logging out');
})

module.exports= router;