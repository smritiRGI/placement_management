const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const querystring = require('querystring');
const bodyparser = require('body-parser');
router.post('/signup',function(req,res)
{
  let usn = req.body.usn;
  let email = req.body.email;
  let password = req.body.psw;
  let repeat_password = req.body.repeat;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let gender = req.body.gender;
  let birth_date = req.body.bday;
  let contact = req.body.contactno;
  let address = req.body.address;
  let sem = req.body.sem;
  let branch = req.body.branch;
  let tenth = req.body.tenth;
  let twelth = req.body.twelth;
  let cgpa = req.body.cgpa;
  let mute = req.body.mute;
  let arrears = req.body.arrears;
  let connect = req.app.get('connect');
  let sql = `insert into student values("${usn}","${email}","${password}","${fname}",
  "${lname}","${gender}","${birth_date}","${contact}","${address}","${sem}",
  "${branch}","${tenth}","${twelth}","${cgpa}","${mute}","${arrears}");`;
  if(password==repeat_password)
  {
      connect.query(sql,(err,result)=>{
        if(result)
           res.render('student_login');
      });
  }
  else
      res.send('registration could not be completed');
});
router.get('/student_login',function(req,res){
	res.render('student_login');
});
router.post('/student_login',function(req,res)
{
		let usn = req.body.usn;
		let password = req.body.password;
		let connect = req.app.get('connect');
    let sql = `select * from student where studentid="${usn}" and password="${password}"` ;
		connect.query(sql,(err,rows)=>{
		        if (rows.length>0)
		          res.render('student_dashboard',{rows});
            else
					     res.send('Invalid Login Credentials');
      });
});
router.get('/update_email/:studentid',function(req,res){
  let studentid = req.params.studentid;
  res.render('update_email',{studentid});
});
router.post('/update_email/:studentid',function(req,res){
  let studentid = req.params.studentid;
  let email = req.body.email;
  let password = req.body.psw;
  let connect = req.app.get('connect');
  let sql = `update student set email = case when password = "${password}" 
  then "${email}" else email end where studentid="${studentid}";`
  connect.query(sql,(err,result)=>{
    if(result)
      res.render('student_login');
    else
      res.send('Email cannot be updated');
  });
});
router.get('/update_contact/:studentid',function(req,res){
  let studentid = req.params.studentid;
  res.render('update_contact',{studentid});
});
router.post('/update_contact/:studentid',function(req,res){
  let studentid = req.params.studentid;
  let contact = req.body.contact;
  let password = req.body.psw;
  let connect = req.app.get('connect');
  let sql = `update student set contact = case when password = "${password}" 
  then "${contact}" else contact end where studentid="${studentid}";`
  connect.query(sql,(err,result)=>{
    if(result)
      res.render('student_login');
    else
      res.send('Contact cannot be updated');
  });
});
router.get('/update_address/:studentid',function(req,res){
  let studentid = req.params.studentid;
  res.render('update_address',{studentid});
});
router.post('/update_address/:studentid',function(req,res){
  let studentid = req.params.studentid;
  let address = req.body.address;
  let password = req.body.psw;
  let connect = req.app.get('connect');
  let sql = `update student set address = case when password = "${password}" 
  then "${address}" else address end where studentid="${studentid}";`
  connect.query(sql,(err,result)=>{
    if(result)
      res.render('student_login');
    else
      res.send('Address cannot be updated');
  });
});
router.get('/update_semester/:studentid',function(req,res){
  let studentid = req.params.studentid;
  res.render('update_semester',{studentid});
});
router.post('/update_semester/:studentid',function(req,res){
  let studentid = req.params.studentid;
  let sem = req.body.sem;
  let password = req.body.psw;
  let connect = req.app.get('connect');
  let sql = `update student set sem = case when password = "${password}" 
  then "${sem}" else sem end where studentid="${studentid}";`
  connect.query(sql,(err,result)=>{
    if(result)
      res.render('student_login');
    else
      res.send('Semester cannot be updated');
  });
});
router.get('/update_cgpa/:studentid',function(req,res){
  let studentid = req.params.studentid;
  res.render('update_cgpa',{studentid});
});
router.post('/update_cgpa/:studentid',function(req,res){
  let studentid = req.params.studentid;
  let cgpa = req.body.cgpa;
  let password = req.body.psw;
  let connect = req.app.get('connect');
  let sql = `update student set cgpa = case when password = "${password}" 
  then "${cgpa}" else cgpa end where studentid="${studentid}";`
  connect.query(sql,(err,result)=>{
    if(result)
      res.render('student_login');
    else
      res.send('cgpa cannot be updated');
  });
});
router.get('/update_password/:studentid',function(req,res){
  let studentid = req.params.studentid;
  res.render('update_password',{studentid});
});
router.post('/update_password/:studentid',function(req,res){
  let studentid = req.params.studentid;
  let newpsw = req.body.newpsw;
  let repeatpsw = req.body.repeatpsw;
  let oldpsw = req.body.oldpsw;
  let connect = req.app.get('connect');
  let sql = `update student set password = case when password = "${oldpsw}" 
  then "${newpsw}" else password end where studentid="${studentid}";`
  if(newpsw==repeatpsw){
  connect.query(sql,(err,result)=>{
    if(result.length > 0)
      res.render('student_login');
    else
      res.send('cgpa cannot be updated');
  });
}
});
router.get('/view_companies_student',function(req,res){
  let connect = req.app.get('connect');
  let sql = `select * from company;`
  connect.query(sql,(err,companies)=>{
    if(companies.length > 0)
       res.render('view_companies_student',{companies});
    else
       res.send('No companies to register');
  });
});
router.get('/company-register/:email',function(req,res){
     let email = req.params.email;
     res.render('company_register',{email});
});
router.post('/company-register/:email',function(req,res){
  let connect = req.app.get('connect');
  let email = req.params.email;
  let studentid = req.body.usn;
  let sql = `insert into registration(studentid,email)
             select criteria.studentid,criteria.email 
             from criteria where criteria.studentid="${studentid}" and criteria.email="${email}";`
  connect.query(sql,(err,result)=>{
         if(result)
             res.render('success');   
          else
            res.send('Sorry ! You do not match the criteria or you already registered');
});
});

module.exports = router;