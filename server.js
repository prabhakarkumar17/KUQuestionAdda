const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require('path');
const app = express();
const nodemon = require('nodemon');
const mysql = require('mysql');
const body_parser = require('body-parser');
const { connect } = require('http2');

var loginStatus = false;

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended : false
}))

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123Ankit',
    database : 'student'
});

connection.connect( (err)=> {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log("Sucess");
    }
});

app.get('/', (request, response) => {
    response.sendFile(
        path.join(
            __dirname + '/index.html'
        )
    );
});

app.get('/:id', (request, response) => {
    const id = request.params.id;

    response.sendFile(
        path.join(
            __dirname + '/' + id
        )
    )
})

app.get('/:idd/:id', (request, response) => {
    const id = request.params.id;
    const idd = request.params.idd;

    response.sendFile(
        path.join(
            __dirname + '/' + idd + '/' + id 
        )
    );
});

app.get('/images/:id', (request, response) => {
    const id = request.params.id;

    response.sendFile(
        path.join(
            __dirname + '/images/' + id
        )
    );
});

app.post('/post/loginSuccess', (request, response) => {

    const roll = request.body.roll;
    const password = request.body.password;
    const update = request.body.update;
    const updateName = request.body.updateName;

    connection.query('UPDATE register SET name = '+mysql.escape(updateName)+'WHERE roll = '+mysql.escape(update),
                                (error,results,field) => {
                                    if(error) throw error;
                                    console.log("Data Updated Successfully");
                                })

    connection.query('SELECT * FROM register WHERE roll = '+mysql.escape(roll), 
                       (error, results, field) => {
                           if(error) throw error;
                           const receivedPassword = results[0].password;
                           if(receivedPassword == password){
                               loginStatus = true;
                               response.send("Login Successfully "+results[0].name);
                           } else {
                               response.send("Try again");
                           }
                       });
});

app.post('/post/register', (request, response) => {

    const name = request.body.name;
    const email = request.body.email;
    const roll = request.body.roll;
    const dept = request.body.dept;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;

    if(password == confirmPassword){
        connection.query('INSERT INTO register VALUES('+mysql.escape(roll)+','
                                                   +mysql.escape(name)+','
                                                   +mysql.escape(email)+','
                                                   +mysql.escape(password)+','
                                                   +mysql.escape(dept)+');', (error, results, field) => {
                                                       if(error) throw error;
                                                       response.send("Data Inserted Successfully");
                                                   })
    } else {
        response.send("Password and confirm password should be same");
    }
   
    //console.log(name,email,roll,confirmPassword,password);
})

app.listen(8084, (request, response) => {
    console.log("Server has started");
})