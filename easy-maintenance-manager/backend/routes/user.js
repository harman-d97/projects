const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hrprt97!',
    database: 'goldenboyfoods',
    port: 3306
});

/**
 * adds new user to the database
 */
router.post('/register', async function (req, res, next) {
    console.log("registering user");
    try {
        let { username, password, firstName, lastName, employeeId, sixDigitCode } = req.body;

        const hashedPassword = md5(password.toString());

        const checkUsername = `SELECT username FROM users WHERE username = ?`;
        connection.query(checkUsername, [username],  (err, result, fields) => {
            if (typeof result == 'undefined' || result.length == 0) {
                const sql = `INSERT INTO users (employeeId , adminAccess, username, password, firstName, lastName, businessCode) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(sql, [employeeId, 0, username, hashedPassword, firstName, lastName, sixDigitCode], (err, result, fields) => {
                    if (err) {
                        console.log('error occured while inserting user');
                        res.send({status: 0, data: err});
                    } else {
                        let token = jwt.sign({data: result}, 'secret');
                        res.send({status: 1, data: result, token: token});
                    }
                });
            }
        });
    } catch (error) {
        console.log('error on first query');
        res.send({status: 0, data: error});
    }
});

/**
 * checks if user exists in the database and if password is correct
 */
router.post('/login', async function (req, res) {
    try {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        console.log(dateTime);
        let { username, password } = req.body;

        const hashedPassword = md5(password.toString());

        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        connection.query(sql, [username, hashedPassword], function(err, result, fields) {
            if (err || result.length == 0) {
                res.send({status: 0, data: err});
            } else {
                let token = jwt.sign({ data: result }, 'secret');
                res.send({ status: 1, data: result, token: token });
            }
        });
    } catch (error) {
        res.send({status: 0, data: error});
    }
});

/**
 * gets all employees from the database
 */
router.get('/get-all-employees', async function (req, res) {
    try {
        const sql = `SELECT employeeId, firstname, lastname FROM users WHERE adminAccess = 0`;
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting all employees');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get all employees query');
        res.send({status: 0, data: error});
    }
});

/**
 * gets all users from the database
 */
router.get('/get-all-users', async function (req, res) {
    try {
        const sql = `SELECT employeeId, firstname, lastname FROM users`;
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log('Error occured while getting all users');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during get all users query');
        res.send({status: 0, data: error});
    }
});

/**
 * deletes user from the database
 */
router.post('/delete-user', async function (req, res) {
    try {
        let { employeeId } = req.body;
        const sql = `DELETE FROM users WHERE employeeId = ?`;
        connection.query(sql, [employeeId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while deleting user');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during delete user query');
        res.send({status: 0, data: error});
    }
});

/**
 * update users admin accessibility in the database
 */
router.post('/give-admin-access', async function (req, res) {
    try {
        let { employeeId } = req.body;
        const sql = `UPDATE users SET adminAccess = 1 WHERE employeeId = ?`;
        connection.query(sql, [employeeId], (err, result, fields) => {
            if (err) {
                console.log('Error occured while promoting user to admin');
                res.send({status: 0, data: err});
            } else {
                res.send({status: 1, data: result});
            }
        });
    } catch (error) {
        console.log('Error occured during admin access query');
        res.send({status: 0, data: error});
    }
});

module.exports = router;