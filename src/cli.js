import inquirer from "inquirer";
import lw3Generator from "./cli/lw3Generator";
import {
  installHardhat,
  getHardhatDataInputs,
  createNextApp,
  generateFrontendFiles

} from './generators'
const fs = require('fs');
/**
 * selectGeneratorType is going to prompt user
 * to select one out of 3 options:
 *
 * First option: Boilerplate generator
 * this option is going to prepare
 * The learnWeb3DAO projects that whatever level you chose
 *
 * Second option: Project setup
 * This option is going to setup your project to install
 * the required dependencies along with common code
 *
 * Third option:Openzeppelin token standards generator
 * This option is going to generate whatever token standard you want to implement
 * and whatever functions you want to override in your contract
 */
async function selectGeneratorType() {
  const options = [];
  options.push({
    type: "list",
    name: "option",
    message: "select generator type: ",
    choices: [
      "LearnWeb3",
      "Install hardhat",
      "Generate hardhat common files",
      "Install nextjs app",
      "Generate nextjs app common files",
    ],
  });

  const answers = await inquirer.prompt(options);
  // generating track levels boilerplate
  if (answers.option == "LearnWeb3") {
    lw3Generator();
  }

  else if (answers.option == "Install hardhat") {
    installHardhat()
  }

  else if (answers.option == "Generate hardhat common files") {
    fs.existsSync("contracts")
    ? getHardhatDataInputs()
    : console.log('Please, switch to a directory where hardhat is installed!');
  } 
  

  else if (answers.option == "Install nextjs app") {
    createNextApp()
  }
  else {
    fs.existsSync("contracts")
    ? generateFrontendFiles()
    : console.log('Please, switch to a directory where nextjs is installed!');  
  }
}

export async function cli() {
  await selectGeneratorType();
}
