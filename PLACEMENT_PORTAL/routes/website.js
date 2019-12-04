const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const session = require('express-session');
router.get('/',(req,res)=>{
	res.render('signup');
});
