const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'node_crude',
  password: '',
});

// List Post
app.get("/api/posts", (req,res)=>{
db.query("select * from posts",(err, rows)=>{
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
})
});

// Post Create
app.post("/api/posts", (req,res)=>{
    const {title, body} = req.body;
db.query("INSERT INTO posts (title, body) values(?, ?)",[title, body],(err, result)=>{
    if (err) return res.status(500).json({ error: err.message });
    res.json({id: result.insertId, title: title, body: body });
})
});

// get Post details
app.get("/api/posts/:id", (req,res)=>{
db.query("select * from posts Where id = ?",[req.params.id],(err, rows)=>{
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows[0]);
})
});

// Post Update
app.put("/api/posts/:id", (req,res)=>{
    const {title, body} = req.body;
db.query("Update posts set title = ?, body = ? where id = ?",[title, body, req.params.id],(err, result)=>{
    if (err) return res.status(500).json({ error: err.message });
    res.json({id: req.params.id, title: title, body: body });
})
});

// Post delete
app.delete("/api/posts/:id", (req,res)=>{
db.query("Delete from posts  Where id = ?",[req.params.id],(err, rows)=>{
    if (err) return res.status(500).json({ error: err.message });
    res.json({"message":"Post Deleted"});
})
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});