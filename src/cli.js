import inquirer from "inquirer";
const chalk = require("chalk");
const clear = require("clear");
import { getWelcomeMessage, getCLIInstructions } from './helpers'
import lw3Generator from "./cli/lw3Generator";
import {
  installHardhat,
  getHardhatDataInputs,
  installNext,
  generateNextFiles,
} from "./generators";
import arg from 'arg';

async function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--i:hardhat': Boolean,
      '--g:hardhat': Boolean,
      '--i:next': Boolean,
      '--g:next': Boolean,
      '--help': Boolean
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    installHardhat: args['--i:hardhat'] || false,
    generateHardhat: args['--g:hardhat'] || false,
    installNext: args['--i:next'] || false,
    generateNext: args['--g:next'] || false,
    help: args['--help'] || false
  };
}

async function selectOption(options, choices) {
  //Shortcut way for every main option
  clear()
  getWelcomeMessage()
  if (options.installHardhat) {
    installHardhat();
  } else if (options.generateHardhat) {
    getHardhatDataInputs()
  } else if (options.installNext) {
    installNext()
  } else if (options.generateNext) {
    generateNextFiles()
  } else if (options.help) {
    getCLIInstructions()
  } else {


    //Prompts user to select one of the main choices
    const selectedOption = await inquirer.prompt([{
      type: "rawlist",
      name: "name",
      message: "choose option: ",
      choices: choices
    }])
    // Gets index of the selected option to call a particular function later
    const index = choices.indexOf(selectedOption.name)

    // generates track levels boilerplate
    // if (index === 0) {
    //   lw3Generator();
    // }
    /** 
     * Selecting the second option installs hardhat and essential dependencies required for hardhat
     * Creates backend directory
     * Installs hardhat
     * Installs dotenv package
     * Installs openzeppelin
     */
    if (index === 0) {
      installHardhat();
    }
    /**
     * Selecting third option generates common files along with code needed in hardhat
     * Takes input data for backend folder, contract and network names
     * Generates .env, hardhat.config, contract, and deploy files
     */
    else if (index === 1) {
      getHardhatDataInputs();
    }
    /**
     * Selecting fourth option installs next.js and essential dependencies required for next.js
     * Creates frontend directory 
     * Installs next.js
     * Installs web3modal
     * Installs ethers
     */
    else if (index === 2) {
      installNext();
    }
    /** 
     * Selecting fifth option generates common files required for next.js
     * Takes input data for contract and network names
     * Generates constant and home page files along with essential code
     */
    else if (index === 3) {
      generateNextFiles();
    }
    /**
     * Help
     * Shows the instructions that how to use the cli command
     */
    else if (index === 4) {
      getCLIInstructions();
    }
  }
}
// cli function starts the lw3-cli execution
export async function cli(args) {
  // Takes command arguments to run a particular function
  let options = await parseArgumentsIntoOptions(args);

  // main choices
  let choices = [
    // chalk.yellow("LearnWeb3"),
    chalk.greenBright("Install Hardhat along with essential dependencies"),
    chalk.blueBright("Generate Hardhat common files"),
    chalk.greenBright("Install Next.js along with essential dependencies"),
    chalk.blueBright("Generate Next.js common files"),
    chalk.yellow("help"),

  ]
  await selectOption(options, choices);
}
