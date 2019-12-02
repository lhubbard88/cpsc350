const express = require("express");
var dateFormat = require('dateformat');
var bodyParser = require("body-parser");
const app = express();
app.set("port",8080);
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({ extended: true}));
const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "server2",
	password: "Server2Password",
	database: "server2",
};
const pool = new Pool(config);
app.get("/list-users", async (req, res) => {
try{
	const type = req.query.type;
	if(type == "full"){
		const template = "SELECT * From users";
		const response = await pool.query(template, []);
		if(response.rowCount == 0){
			res.json({error: "no users found"});
		} else{
			res.json({users: response.rows });
		}
	} else if(type == "summary"){
		const template = "SELECT firstname, lastname FROM users";
		const response = await pool.query(template, []);
	/*	const result = response.rows.map(function(item){
			const group = {};
			group.firstname = item.firstname;
			group.lastname = item.lastname;
			return group;
		});*/
		res.json({users: response.rows});
	}

}catch(err){
	console.log(err);
	res.json({error: "error" });
}

});

app.get("/list-workshops", async (req, res) => {
try{
	const template = "SELECT title,time,location FROM workshops";
	const response = await pool.query(template, []);
	const result = response.rows.map(function(item){
		const group = {};
		group.title  =  item.title;
		group.date =  dateFormat(item.time, ('yyyy-mm-dd'));
		group.location =  item.location;
		return group;
	});
	//dateFormat(response.rows.time, ("yyyy-mm-dd"));
	res.json({workshops: result});
	}catch(err){
		console.log(err);
		res.json({error: "error" });
	}
});

app.get("/attendees", async (req, res) => {
	const title = req.query.title;
	const date = req.query.date;
	const location = req.query.location;
try{
	const template = "SELECT * FROM workshops WHERE title = $1 AND time = $2 AND location = $3";
	const response = await pool.query(template, [title,date,location]);
	if(response.rowCount == 0){
		res.json({error: "workshop does not exist"});
	}else{
		const firstTemp = "SELECT * FROM workshops WHERE title = $1 AND time = $2 and location = $3";
                const firstRes = await pool.query (firstTemp, [title, date, location]);
		const template = "SELECT users.firstname,users.lastname FROM users JOIN enrolled ON users.username = enrolled.username JOIN workshops ON workshops.ID = enrolled.ID WHERE enrolled.ID = $1";
		const response = await pool.query(template, [firstRes.rows[0].id]);
		if(response.rowCount == 0){
			res.json({ attendees: response.rows });
		}else{
		res.json({attendees: response.rows});
		}
	}}catch(err){
		console.log(err);
		res.json({error:"error"});
	}
});
app.post("/create-user", async (req, res) =>{
try{
	const username = req.body.username;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const template = "SELECT * FROM users WHERE username = $1";
	const response = await pool.query (template, [username]);
	if(response.rowCount == 0){
		const template = "INSERT INTO users(username,firstname,lastname,email) Values($1,$2,$3,$4)";
		const response = await pool.query(template, [username,firstname,lastname,email]);
		res.json({status: "user added"});
	}else{
		res.json({ status: "username taken"});
	}}catch(err){
		res.json({error: "error" });
	}
});

app.post("/add-workshop", async (req, res) =>{
try{
	const title = req.body.title;
	const date = req.body.date;
	const loc = req.body.location;
	const maxseats = req.body.maxseats;
	const instructor = req.body.instructor;
	const template = "SELECT * FROM workshops WHERE title = $1 AND time = $2 AND location =$3";
	const response = await pool.query (template, [title,date,loc]);
	if(response.rowCount == 0){
		const template = "INSERT INTO workshops(title,time,location,maxseats,instructor) Values($1,$2,$3,$4,$5)";
		const response = await pool.query (template, [title,date,loc,maxseats,instructor]);
		res.json({status: "workshop added"});
	}else{
		res.json({status: "workshop already in database"});
	}}catch(err){
		console.log(err);
		res.json({error:"error"});
	}
});

app.post("/enroll", async (req, res) =>{
try{
	const title = req.body.title;
	const date = req.body.date;
	const location = req.body.location;
	const username = req.body.username;
	const template = "SELECT * FROM users WHERE username = $1";
	const response = await pool.query (template, [username]);
	if(response.rowCount == 0){
		res.json({status: "user not in database"});
	}else{
		const template = "SELECT * FROM workshops WHERE title = $1 AND time = $2 AND location = $3" ;
		const response = await pool.query (template, [title,date,location]);
		if(response.rowCount == 0){
		
		res.json({status: "workshop does not exist"});
		}else{
			const firstTemp = "SELECT * FROM workshops WHERE title = $1 AND time = $2 and location = $3";
                        const firstRes = await pool.query (firstTemp, [title, date, location])
			const template = "SELECT users.username FROM users JOIN enrolled ON users.username = enrolled.username WHERE enrolled.username = $1 AND enrolled.ID = $2";
			const response = await pool.query (template, [username,firstRes.rows[0].id]);
			if(response.rowCount != 0){
				res.json({status: "user already enrolled"});
			}else{
				const firstTemp = "SELECT * FROM workshops WHERE title = $1 AND time = $2 and location = $3";
                                const firstRes = await pool.query (firstTemp, [title, date, location]);
				const FirstTemplate = "SELECT maxseats FROM workshops WHERE title = $1";
				const maxseats = await pool.query (FirstTemplate, [title]);
				const template = "SELECT enrolled.username FROM enrolled JOIN users ON users.username = enrolled.username JOIN workshops ON workshops.ID = enrolled.ID WHERE workshops.ID = $1";
				const response = await pool.query (template, [firstRes.rows[0].id]);
				if(response.rowCount >= firstRes.rows[0].maxseats){
					res.json({ status: "no seats available"});
				}else{
					const firstTemp = "SELECT * FROM workshops WHERE title = $1 AND time = $2 and location = $3";
					const firstRes = await pool.query (firstTemp, [title, date, location])
					const result = firstRes.rows.map(function(item){
						return item.ID;
					});
					//res.json(result);
					const template = "INSERT INTO enrolled(ID,username) VALUES($1,$2)";
					const response = await pool.query (template, [firstRes.rows[0].id, username]);
					res.json({status: "user added"});
		}}}}}catch(err){
			console.log(err);
			res.json({error: "error"});
				}
});

app.delete("/delete-user", async (req, res) =>{
try{
	const username = req.body.username;
	const template = "SELECT * FROM users WHERE username = $1";
	const response = await pool.query (template,[username]);
	if(response.rowCount != 0){
		const template = "DELETE FROM users WHERE username = $1";
		const response = await pool.query(template,[username]);
		res.json({status: "deleted"});
	}}catch(err){
		console.log(err);
		res.json({error:"error"});
	}
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}`
	);
});

