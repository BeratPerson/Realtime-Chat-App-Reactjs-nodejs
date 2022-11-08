const express = require("express");
const router = express.Router();
const { Login } = require('../controllers/AuthenticationController.js');


router.post('/login', Login);


module.exports = router;