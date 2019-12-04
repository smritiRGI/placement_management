const express = require('express');
const router = express.Router();
router.get('/admin_login',(req,res)=>{
		res.render('admin_login');
});
router.post('/admin_login',(req,res)=>{
		let email = req.body.email;
		let password = req.body.psw;
        let connect = req.app.get('connect');
		let sql = `select email from administrator where 
		email="${email}" and password="${password}"`;
		connect.query(sql,(err,fields)=>{
		    if(fields)
		    	res.render('admin_dashboard');
			else 
				res.send('Enter correct username and password');
		});
});
router.get('/logout',function(req,res){
	res.redirect('/admin_login');
});
router.get('/admin_dashboard',(req,res) => {
	res.render('admin_dashboard');
});
router.get('/add_company',(req,res)=>{
	res.render('add_companies');
});

router.post('/add_company', (req,res)=>{
	let company_name = req.body.name;
	let email = req.body.email;	
	let allowed_branches = req.body.branch;
	let job_desc = req.body.JD;
	let schedule = req.body.schedule;
	let mute = req.body.mute;
	let arrears = req.body.arrears;
	let tenth = req.body.tenth;
	let twelveth = req.body.twelveth;
	let cgpa = req.body.cgpa;
	let closed = req.body.rclose;
	let connect = req.app.get('connect');
	let sql_query = `insert into company values("${email}","${company_name}","${job_desc}","${schedule}","${mute}","${arrears}","${tenth}",
				     "${twelveth}","${cgpa}","${closed}");`;
	connect.query(sql_query,(err,result)=>{
		        if(err)console.log(err);
		        else{
		        for(i = 0 ; i < allowed_branches.length ; i++){
							let sql = `insert into company_branch
							values("${email}","${allowed_branches[i]}");`;
							connect.query(sql,(error,results)=>{
								if(results)
								res.render('admin_dashboard');
							    else
							    res.send('Try Again')
							});
						}
					}
		    });
});
router.get('/view_companies',(req,res)=>{
	let connect = req.app.get('connect');
	let sql = `select * from company;`;
	connect.query(sql,function(err,Companies){
			if(Companies)
			  res.render('view_companies',{Companies});
			else
			  res.send("Cannot view companies");
    });
});
router.get('/update_company/:email',function(req,res)
{
	let email = req.params.email;
	let connect = req.app.get('connect');
	res.render('update_company',{email});
});
router.post('/update_company/:email',function(req,res){
	let connect = req.app.get('connect');
	let email = req.params.email;
	let schedule = req.body.schedule;
	let registration_closed = req.body.closed;
	let sql = `update company set schedule = "${schedule}",
				closed = "${registration_closed}" where email= "${email}";`;
    connect.query(sql,(err,updated)=>{
		if(updated)
			res.render('admin_dashboard');
		else res.send('Update failed');
    });
});
router.get('/register_students',function(req,res){
	 let sql = `select * from registered;`;
	 let connect = req.app.get('connect');
	 connect.query(sql,(err,registered)=>{
		 if(registered.length>0)
         res.render('view_registered_students',{registered});
         else
         res.send('No registrations');
	 });
});
router.get('/add_shortlist/:email',function(req,res){
	    let email = req.params.email;
	    let sql = `select studentid from registration where email = "${email}"`;
	    let connect = req.app.get('connect')
        connect.query(sql,(err,candidates)=>{
        	if(candidates.length > 0)
        		res.render('add_shortlisted',{email,candidates});
        	else
        		res.send('no candidates registered');
        });
});
router.post('/add_shortlist/:email',function(req,res)
{
	let email = req.params.email;
	let candidates = req.body.shortlist;
	let connect = req.app.get('connect');
	for(i = 0 ; i < candidates.length ; i++){
	let sql = `insert into shortlist values("${candidates[i]}","${email}");`;
	connect.query(sql,function(err,result)=>{
		if(result) res.render('admin_dashboard');
	});
}
});
module.exports = router;