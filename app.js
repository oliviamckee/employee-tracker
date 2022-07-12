const inquirer = require("inquirer");
const cTable = require("console.table");

const mainMenu = [
    {
        type: "checkbox",
        name: "mainMenu",
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

const addEmployee = [
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
        type: "checkbox",
        name: "employeeRole",
        message: "What is the employee's role?",
        choices: []
    },
    {
        type: "checkbox",
        name: "employeeManager",
        message: "Who is the employee's manager (if applicable?",
        choices: []
    }
];

const addRole = [
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
        type: "Checkbox",
        name: "roleDepartment",
        message: "To what department does the role belong?",
        choices: []
    }
]

const addDepartment = [
    {
        type: "text",
        name: "departmentName",
        message: "What is the name of the department?"
    }
]