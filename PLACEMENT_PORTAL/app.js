const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const session = require('express-session');
const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sa1234@njay",
  database:"placement_management"
});
connect.connect((error,result)=>{
  if(error)throw error;
  console.log('connected');
});
app.set('connect',connect);
app.set('view engine','ejs');
app.set('views','./views');
app.set('port',process.env.PORT || 3000);
//configurations
app.use(express.static('./public'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyparser.urlencoded({extended: false }));
app.use(bodyparser.json() );  
// import routes
app.use(require('./routes/website.js'));
app.use(require('./routes/admin.js'));
app.use(require('./routes/student.js'));

const server = app.listen(app.get('port'));



module.exports = app;