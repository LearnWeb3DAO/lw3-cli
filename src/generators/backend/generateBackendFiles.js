import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync } from "fs";
import { registerHelpers } from "../../helpers";
import { toPascalCase } from "../../helpers/helpers";

registerHelpers(Handlebars);

/**
 * Prompts the user for a project name and network
 * and creates a Hardhat skeleton project
 * inside that directory. Generates a .env and
 * config file with the specified network
 * @returns {string} The directory in which the Next app was created in
 */

const generateBackendFiles = async () => {
  const { contract } = await inquirer.prompt([
    {
      name: "contract",
      type: "input",
      message: "Enter contract name: ",
    },
  ]);

  const { network } = await inquirer.prompt([
    {
      name: "network",
      type: "list",
      message: "Network: ",
      choices: ["Rinkeby", "Ropsten"],
      default: "Rinkeby",
    },
  ]);

  const hardhatConfigTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/hardhat.config.hbs"),
      "utf-8"
    )
  )({ network });

  const contractTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/contract.hbs"),
      "utf-8"
    )
  )({ contract });

  const dotEnvTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/env.hbs"),
      "utf-8"
    )
  )({ network });

  const hardhatPath = path.join(process.cwd())

  const creatingFiles = () => {
    writeFileSync(`contracts/${toPascalCase(contract)}.sol`, contractTemplateContent)
    writeFileSync('.env', dotEnvTemplateContent)
    writeFileSync('hardhat.config.js', hardhatConfigTemplateContent)
  }

  try {
    creatingFiles()
    console.log('✅ Created the following common files successfully')
    console.log(`${path.join(hardhatPath, `contracts/${toPascalCase(contract)}.sol`)}`);
    console.log(`${path.join(hardhatPath, '.env')}`);
    console.log(`${path.join(hardhatPath, 'hardhat.config.js')}`)

  } catch (error) {
    if (error.code = "ENOENT") {
      console.log('You are not in hardhat directory')
    }
  }
};

export default generateBackendFiles;