require('dotenv').config();
const express = require('express');
// import and require inquirer
const inquirer = require('inquirer');
// import and require console.table
const cTable = require('console.table');
// import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to the department 
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'company_db',  
  },
  console.log(`Connected to the department_db database.`)
);

