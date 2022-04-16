import inquirer from "inquirer";
import lw3Generator from "./cli/lw3Generator";
import {
  createHardhat,
  generateBackendFiles,
  createNextApp,
  generateFrontendFiles

} from './generators'
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
      "Install hardhat && dotenv packages",
      "Generate hardhat common files",
      "Install nextjs app",
      "Generate nextjs app common files",
      "Openzeppelin token standards generator",
    ],
  });

  const answers = await inquirer.prompt(options);
  // generating track levels boilerplate
  if (answers.option == "LearnWeb3") {
    lw3Generator();
  }

  else if (answers.option == "Install hardhat && dotenv packages") {
    createHardhat()
  }

  else if (answers.option == "Generate hardhat common files") {
    generateBackendFiles()
  }

  else if (answers.option == "Install nextjs app") {
    createNextApp()
  }
  else if (answers.option == "Generate nextjs app common files") {
    generateFrontendFiles()
  }

  else if (answers.option == "Generate nextjs app common files") {
    generateFrontendFiles()
  }
  // generating the overriding methods of Openzeppelin token standards
  else if (answers.option = "Openzeppelin token standards generator") {
    console.log("Will be added very soon ...");
  }
}

export async function cli() {
  await selectGeneratorType();
}
