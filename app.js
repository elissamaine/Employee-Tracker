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

//connect to the company_db database 
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'company_db',  
  },
  console.log(`Connected to the department_db database.`)
);

const start = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'openingPrompt',
      message: 'what would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ]
    })
    .then((response) => {
        switch (response.openingPrompt) {
            case 'View all departments':
              viewDepartments();
            break;
            case 'View all roles':
              viewRoles();
            break;
            case 'View all employees':
              viewEmployees();
            break;
            case 'Add a department':
              addDepartment();
            break;
            case 'Add a role':
              addRole();
            break;
            case 'Add an employee':
              addEmployee();
            break;
            case 'Update an employee role':
              updateEmployeeRole();
            break;
        }
    })
};

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    const table = cTable.getTable(rows);
    console.log('View all departments');
    console.log(table);
    start();
  });
};

const viewRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    const table = cTable.getTable(rows);
    console.log('View all roles');
    console.log(table);
    start();  
  });
};

const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    const table = cTable.getTable(rows);
    console.log('View all employees');
    console.log(table);
    start();
  });
};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateEmployeeRole = () => {};

start();