const express = require ("express");
var bodyParser = require("body-parser");
const app = express();
app.set("port",8080);
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({ extended: true}));
const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "workshops",
	password: "WorkshopsPassword",
	database: "workshops"
};
const pool = new Pool(config);
app.get("/hello", (req,res) => {
});
app.post("/api", async (req, res) => {
	const workshop = req.body.workshop;
	const attendee = req.body.attendee;
try{
	const template = "SELECT * FROM workshops WHERE workshop = $1 AND attendee = $2";
	const response = await pool.query(template, [workshop,attendee]);
	if(response.rowCount ==0){
	
		const template = "INSERT INTO workshops(workshop,attendee) VALUES ($1,$2)";
		const response = await pool.query(template, [
			workshop,
			attendee
		]);
		res.json({  attendee: attendee, workshop: workshop });
	}else{
		res.json({ error: "attendee already enrolled"});
	}} catch(err){
		res.json({ error: "error" });
	}


});

app.get("/api",async (req, res) => {	
try{
	if(req.query.workshop){
        	const template = "SELECT attendee FROM workshops WHERE workshop = $1";
        	const response = await pool.query(template, [req.query.workshop]);
		const result = response.rows.map(function(item){
			return item.attendee
		});
        	if(response.rowCount == 0){
                	res.json({error: "workshop not found", searchTerm: req.query.q });
        	} else{
                	res.json({ attendees: result });
        	}
	}
	else{
		const template = "SELECT DISTINCT workshop FROM workshops";

		const response = await pool.query(template);
		const result = response.rows.map(function(item){
			return item.workshop
		});
		if(response.rowCount == 0){
			res.json({error: "workshop not found"});
		}else{
			res.json({ workshops: result});
		}
	}
} catch (err) {
        console.error("Error running query " + err);
        res.json({ status: "error" });
}
});
app.listen(app.get("port"), () => {
console.log('running')
});
