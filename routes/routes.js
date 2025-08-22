const express = require('express');
const home = require('../controllers/home');
const auth = require("../controllers/auth")
const isLoggesIn = require("../middleware/authorization")
const router = express.Router();


router.get("/hello",home.hello)

router.post("/register",auth.register)
router.post("/login",auth.login)
router.post("/convert",isLoggesIn,home.homepage);

module.exports = router;