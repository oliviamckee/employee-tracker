const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require('mysql2');
const express = require('express');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Phoebe1960!',
  database: 'employee_tracker'
});

const mainMenuQuestion = [
    {
        type: "checkbox",
        name: "menu",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    }
];

const addEmployeeQuestions = [
    {
        type: "text",
        name: "employeeFirstName",
        message: "What is the employee's first name?"
    },
    {
        type: "text",
        name: "employeeLastName",
        message: "What is the employee's last name?"
    },
    {
        type: "number",
        name: "employeeRole",
        message: "Enter the ID of the employee's role.",
    },
    {
        type: "number",
        name: "employeeManager",
        message: "Enter the ID of employee's manager (if applicable).",
    }
];

const addRoleQuestions = [
    {
        type: "text",
        name: "roleName",
        message: "What is the name of the role?",
    },
    {
        type: "text",
        name: "roleSalary",
        message: "What is the salary of the role?",
    },
    {
        type: "number",
        name: "roleDepartment",
        message: "Enter the ID of the department to which the role belongs.",
    }
];

const addDepartmentQuestions = [
    {
        type: "text",
        name: "departmentName",
        message: "What is the name of the department?"
    }
];

const updateEmployeeQuestions = [
    {
        type: "number",
        name: "employeeName",
        message: "Enter the ID of the employee you would like to update.",
    },
    {
        type: "number",
        name: "employeeRole",
        message: "Enter the ID of their new role.",
    }
]

const promptMenu = () => {
    return inquirer
    .prompt(mainMenuQuestion)
    .then((answers) => {
        if (answers.menu == "View All Departments") {
            return getDepartments();
        }
        if (answers.menu == "Add Department") {
            return addDepartment();
        }
        if (answers.menu == "View All Roles") {
            return getRoles();
        }
        if (answers.menu == "Add Role") {
            return addRole();
        }
        if (answers.menu == "View All Employees") {
            return getEmployees();
        }
        if (answers.menu == "Add Employee") {
            return addEmployee();
        }
        if (answers.menu == "Update Employee Role") {
            return updateEmployeeRole();
        }
        if (answers.menu == "Quit") {
            return;
        }
    });
};

const getDepartments = () => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        console.table(rows);
        return promptMenu();
    });
};

const addDepartment = () => {
    return inquirer
    .prompt(addDepartmentQuestions)
    .then((answers) => {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        const params = [answers.departmentName];

        db.query(sql, params, (err, rows) => {
            console.log("Department added.");
            return promptMenu();
        });
    });
};

const getRoles = () => {
    const sql = `SELECT role.*, department.name 
    AS department_name 
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        console.table(rows);
        return promptMenu();
    });
};


const addRole = () => {
    return inquirer
    .prompt(addRoleQuestions)
    .then((answers) => {
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const params = [
            answers.roleName, 
            answers.roleSalary, 
            answers.roleDepartment
        ];

        db.query(sql, params, (err, rows) => {
            console.log("Role added.");
            return promptMenu();
        });
    });
};

const getEmployees = () => {
    const sql = `SELECT e.*, role.title AS role_name, 
                            m.first_name AS manager_first, 
                            m.last_name AS manager_last
                FROM employee AS e
                LEFT JOIN role 
                    ON e.role_id = role.id
                LEFT JOIN employee AS m
                    ON e.manager_id = m.id
                LEFT JOIN employee AS ma
                    ON e.manager_id = ma.id;`
    db.query(sql, (err, rows) => {
        console.table(rows);
        return promptMenu();
    });
};

const addEmployee = () => {
    return inquirer
    .prompt(addEmployeeQuestions)
    .then((answers) => {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const params = [
            answers.employeeFirstName, 
            answers.employeeLastName, 
            answers.employeeRole,
            answers.employeeManager
        ];

        db.query(sql, params, (err, rows) => {
            console.log("Employee added.");
            return promptMenu();
        });
    });
};

// working
const updateEmployeeRole = () => {
    return inquirer
    .prompt(updateEmployeeQuestions)
    .then((answers) => {
        const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;
        const params = [answers.employeeRole, answers.employeeName];

        db.query(sql, params, (err, rows) => {
            console.log("Employee role updated.");
            return promptMenu();
        });
    });
};

promptMenu();