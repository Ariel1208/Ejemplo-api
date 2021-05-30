const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});

connection.connect(error => {
    if (error) throw error;
    console.log('Base de datos conectada');
})

app.listen(PORT, () => console.log("Servidor corriendi en: " + PORT));

app.get('/', (req, res) => {
    res.send('Welcome to my Api');
})


app.get('/costumers', (req, res) => {
    const sql = 'SELECT* FROM costumer';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not resutl');
        }
    })
})

app.get('/costumers/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT* FROM costumer WHERE id = ${id}`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not resutl');
        }
    })

})

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO costumer SET ?';

    const customerObj = {
        name: req.body.name,
        city: req.body.city
    }

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Costumer created');
    })
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;

    const sql = `UPDATE costumer SET name = '${name}', city = '${city}' WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send('Costumer updated')
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM costumer  WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send('Costumer updated')
    })
});