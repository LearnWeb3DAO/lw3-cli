import inquirer from "inquirer";
const chalk = require("chalk");
const clear = require("clear");
import {getWelcomeMessage, getCLIInstructions} from './helpers'
import lw3Generator from "./cli/lw3Generator";
import {
  installHardhat,
  getHardhatDataInputs,
  installNext,
  generateNextFiles,
} from "./generators";
const fs = require("fs");
import arg from 'arg';
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

 async function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--i:hardhat':Boolean,
      '--g:hardhat':Boolean,
      '--i:next':Boolean,
      '--g:next':Boolean,
      '--help':Boolean
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    installHardhat: args['--i:hardhat'] || false,
    generateHardhat: args['--g:hardhat'] || false,
    installNext: args['--i:next'] || false,
    generateNext:args['--g:next'] || false,
    help:args['--help'] || false
  };
}

async function selectGeneratorType(options) {
  clear()
  getWelcomeMessage()
  if(options.installHardhat){
    installHardhat();
  }else if(options.generateHardhat){
    getHardhatDataInputs()
  }else if(options.installNext){
    installNext()
  }else if(options.generateNext){
    generateNextFiles()
  }else if(options.help){
    getCLIInstructions()
  }else{

  const options = [];
  options.push({
    type: "list",
    name: "option",
    message: "select generator type: ",
    choices: [
      chalk.yellow("LearnWeb3"),
      chalk.greenBright("Install Hardhat along with essential dependencies"),
      chalk.blueBright("Generate Hardhat common files"),
      chalk.greenBright("Create Next.js app"),
      chalk.blueBright("Generate Next.js app common files"),
    ],
  });

  const answers = await inquirer.prompt(options);

  // generating track levels boilerplate
  if (answers.option == chalk.yellow("LearnWeb3")) {
    lw3Generator();
  } else if (
    answers.option == chalk.greenBright("Install Hardhat along with essential dependencies"))
    {
    installHardhat();
  } else if (
    answers.option == chalk.blueBright("Generate Hardhat common files")
  ) {
    fs.existsSync("contracts")
      ? getHardhatDataInputs()
      : console.log(
          chalk.red(
            "Hardhat directory is not found!\nPlease, switch to a directory where Hardhat is installed!"
          )
        );
  } else if (answers.option == chalk.greenBright("Create Next.js app")) {
    installNext();
  } else {
    fs.existsSync("pages")
      ? generateNextFiles()
      : console.log(
          chalk.red(
            "Next.js directory is not found!\nPlease, switch to a directory where Next.js is installed!"
          )
        );
  }
}
}

export async function cli(args) {
  let options = await parseArgumentsIntoOptions(args);
  await selectGeneratorType(options);
}
