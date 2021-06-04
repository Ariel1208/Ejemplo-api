const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3050;


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
}, bodyParser.json());
var connection = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b9d56c03a4a64a',
    password: "d065901f",
    database: 'heroku_75dca23ebd2db75'
});


connection.getConnection(error => {
    if (error) throw error;
    console.log('Base de datos conectada');
});

app.listen(PORT, () => console.log("Servidor corriendi en: " + PORT));

app.get('/', (req, res) => {
    res.send('Welcome to my Api');
});


app.get('/Usuarios', (req, res) => {
        const sql = 'SELECT* FROM lista_servicio_cocina';
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send('Not resutl');
            }
        });
    });

    app.post('/validacionUsuario', (req, res) => {
        const { email, pass } = req.body;
    
        const sql = `SELECT * FROM lista_servicio_cocina WHERE correo = '${email}' and contrasena = '${pass}'`;

        connection.query(sql, (error,results) => {
            if (error) throw error;

            if(results.length>0){
                res.send(results[0]);
            }else{
                res.send({});
            }
        })

    });

    app.get('/platillosSemanales', (req, res) => {
        const sql = 'CALL PROC_PLATILLOS_SEMANALES';
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send('Not resutl');
            }
        });
    });

    app.get('/pagosUsuario/:id', (req, res) => {
        const { id } = req.params;
        const sql = `SELECT* FROM historial_pagos_cocina WHERE id_usuario = ${id} ORDER BY historial_pagos_cocina.fecha_pago DESC`;
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send('Not resutl');
            }
        });
    });

    /*
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
        });

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

    });

    app.put('/update/:id', (req, res) => {
        const { id } = req.params;
        const { name, city } = req.body;

        const sql = `UPDATE costumer SET name = '${name}', city = '${city}' WHERE id = ${id}`;

        connection.query(sql, (error, results) => {
            if (error) throw error;
            res.send('Costumer updated')
        });


    })

    app.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM costumer  WHERE id = ${id}`;

        connection.query(sql, (error, results) => {
            if (error) throw error;
            res.send('Costumer updated')
        });

    });*/