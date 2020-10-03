const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const { create } = require("domain");

function main() {
    const questions = [

        {
            type: 'list',
            message: "What kind of employee do you want to add?",
            name: "typeofemployee",
            choices: ["Manager", "Engineer", "Intern"]

        },

    ];

    inquirer.prompt(questions).then(responses => {
        console.log(responses);
        if (responses.typeofemployee === "Manager"){
            createManager();
        } else if (responses.typeofemployee === "Engineer") {
            createEngineer();
        } else {
            createIntern();
        }

    });
}

main();

function createManager() {
    const questions = [

        {
            type: 'input',
            message: "What is your name?",
            name: "name",

        },
        {
            type: 'input',
            message: "What is your ID?",
            name: "id",

        },
        {
            type: 'input',
            message: "What is your email?",
            name: "email",

        },
        {
            type: 'input',
            message: "What is your office number?",
            name: "officenumber",

        },

    ];

    inquirer.prompt(questions).then(response => {
        const newManager = new Manager(response.name, response.id, response.email, response.officenumber);
        employees.push(newManager);
        continuer();
    });
}
function createEngineer() {
    const questions = [

        {
            type: 'input',
            message: "What is your name?",
            name: "name",

        },
        {
            type: 'input',
            message: "What is your ID?",
            name: "id",

        },
        {
            type: 'input',
            message: "What is your email?",
            name: "email",

        },
        {
            type: 'input',
            message: "What is your Github profile URL?",
            name: "github",

        },

    ];

    inquirer.prompt(questions).then(response => {
        const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(newEngineer);
        continuer();
    });
}
function createIntern() {
    const questions = [

        {
            type: 'input',
            message: "What is your name?",
            name: "name",

        },
        {
            type: 'input',
            message: "What is your ID?",
            name: "id",

        },
        {
            type: 'input',
            message: "What is your email?",
            name: "email",

        },
        {
            type: 'input',
            message: "What is the name of your school?",
            name: "school",

        },

    ];

    inquirer.prompt(questions).then(response => {
        const newIntern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(newIntern);
        continuer();
    });
}

function continuer() {

    const questions = [

        {
            type: 'confirm',
            message: "Do you want to add another employee",
            name: "another",
        },

    ];
    inquirer.prompt(questions).then(responses => {
        console.log(responses);
        if (responses.another === true) {
            main();
        } else {
            console.log(employees);
            createHTML();

        }
    });
};

function createHTML() {
    const htmlInfo = render(employees);
    fs.writeFile(outputPath, htmlInfo, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('HTML created');
        }
    });
}; 
