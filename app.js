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

//connect to the company_db database that was created in the db/schema.sql file
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'company_db',  
  },
  console.log(`Connected to the department_db database.`)
);

// inquirer command line prompt with list of options to interact with the database with mysql
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
        'Update an employee manager',
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
            case 'Update an employee manager':
              updateEmployeeManager();
              break;
        }
    })
};

// functions containing the mysql queries to interact with the database
// displayes table of the departments and id's 
const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, data) => {
    const table = cTable.getTable(data);
    console.log('View all departments');
    console.log(table);
    start();
  });
};

// displayes table of the roles and id's salaries and department id's
const viewRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, data) => {
    const table = cTable.getTable(data);
    console.log('View all roles');
    console.log(table);
    start();  
  });
};

// displayes table of the employees, their id's, first and last names, role id's and manager id's
const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, data) => {
    const table = cTable.getTable(data);
    console.log('View all employees');
    console.log(table);
    start();
  });
};

// prompts user to input data in order to add a department to the database
const addDepartment = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department you would like to add?',
    })
    .then((response) => {
      const sql = `INSERT INTO departments (dp_name) VALUES (?)`;
      const params = [response.departmentName];
      db.query(sql, params, (err, data) => {
        if (err) {
          console.log(err);
          console.log('Department could not be added.');
        } else {
          console.log('Department added!');
        }
        start();
      });
    });
};

//prompts user to input data in order to add a role to the database
const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role you would like to add?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role you would like to add?',
    },
    {
      type: 'input',
      name: 'department',
      message: 'What is the department id for the role you would like to add?',
    }
  ])
  .then((response) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [response.title, response.salary, response.department];
    db.query(sql, params, (err, data) => {
      if (err) {
        console.log(err);
        console.log('Role could not be added.');
      } else {
        console.log('Role added!');
      }
      start();
    });
  })
};

// prompts user to input data in order to add an employee to the database
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the employee you would like to add?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the last name of the employee you would like to add?',
      },
      {
        type: 'input',
        name: 'role',
        message: 'What is the id for the role of the employee you would like to add?',
      },
      {
        type: 'input',
        name: 'manager',
        message: 'What is the id of the manager for the employee you would like to add? (NULL if none)',
      }
    ])
    .then ((response) => {
      // changes users string inputs of null to int null for mysql query
      if (response.manager === 'NULL' || response.manager === 'null' || response.manager === 'Null') {
        response.manager = null;
        }
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [response.firstName, response.lastName, response.role, response.manager];
      db.query(sql, params, (err, data) => {
        if (err) {
          console.log(err);
          console.log('Employee could not be added.');
        } else {
          console.log('Employee added!');
        }
        start();
      });
    })
};

// prompts user to input data in order to update an employees role in the database
const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'What is the id of the employee you would like to update?',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'What is the id of the employees new role?',
      }
    ])
    .then((response) => {
      const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
      const params = [response.roleId, response.employeeId];
      db.query(sql, params, (err, data) => {
        if (err) {
          console.log(err);
          console.log('Employee role could not be updated.');
        } else {
          console.log('Employee role updated!');
        }
        start();
        });
    })
};

// prompts user to input data in order to update an employees manager in the database
const updateEmployeeManager = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee',
        message: 'What is the id of the employee you would like to update?',
      },
      {
        type: 'input',
        name: 'manager',
        message: 'What is the id of the employees new manager? (NULL if none)',
      }
    ])
    .then((response) => {
      if (response.manager === 'NULL' || response.manager === 'null' || response.manager === 'Null') {
        response.manager = null;
        }
      const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
      const params = [response.manager, response.employee];
      db.query(sql, params, (err, data) => {
        if (err) {
          console.log(err);
          console.log('Employee manager could not be updated.');
        } else {
          console.log('Employee manager updated!');
        }
        start();
      });
    })
};


start();