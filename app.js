const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 9000; 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aws_service'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected')
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//create user
app.post('/user', (req,res) => {
    const { name, description } = req.body;
    const newItem = { name, description }; 
    const sql = 'INSERT INTO user_tbl SET ?';

    db.query(sql, newItem, (err, result) => {
        if(err){
            res.status(500).send(err);
        } else{
            res.status(201).send('User registered successfully')
        }
    })
})

app.put('/user/:id', (req,res) => {
    const { name, description } = req.body;
    const updatedUser = { name, description }; 
    const sql = 'UPDATE user_tbl SET ? WHERE id = ?';
    const id = req.params.id;

    db.query(sql, [updatedUser, id], (err, result) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send("User updated!")
        }
    })
})

// Read All Items
app.get('/user', (req, res) => {
    const sql = 'SELECT * FROM user_tbl';
  
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  });

// Delete Item
app.delete('/user/:id', (req, res) => {
    const sql = 'DELETE FROM user_tbl WHERE id = ?';
    const id = req.params.id;
  
    db.query(sql, id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Item deleted successfully');
      }
    });
});

module.exports = app;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});