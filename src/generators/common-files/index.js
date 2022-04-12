const inquirer = require('inquirer');

const createHardhat = require('./frontend/createNextApp')
const createNextApp = require ('./frontend/createNextApp')

async function selectFrontendOrBackend(){
    const options = []
    options.push({
        type: "list",
        name: "option",
        message: "select generator type: ",
        choices: [
            "Backend",
            "Frontend"
        ]
    });

    const answers = await inquirer.prompt(options);

    // preparing backend
    if (answers.option == "Backend") {
        createHardhat()
    }

    // preparing frontend
    else {
        createNextApp()
    }
}


module.exports = {selectFrontendOrBackend}