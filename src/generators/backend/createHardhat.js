import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import { registerHelpers } from "../../helpers";
import { runInstructions } from "../../helpers";
import { toPascalCase } from "../../helpers/helpers";

registerHelpers(Handlebars);

/**
 * Prompts the user for a project name and network
 * and creates a Hardhat skeleton project
 * inside that directory. Generates a .env and
 * config file with the specified network
 * @returns {string} The directory in which the Next app was created in
 */

export const createHardhat = async () => {
  const { hardhatFolder } = await inquirer.prompt([
    {
      name: "hardhatFolder",
      type: "input",
      message: "Hardhat folder name: ",
      default: "hardhat-tutorial",
    },
  ]);

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

  console.log("Generating Hardhat app...");

  const hardhatConfigFile = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/hardhat.config.hbs"),
      "utf-8"
    )
  )({ network });

  const contractFile = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/contract.hbs"),
      "utf-8"
    )
  )({ contract });

  const dotEnvFile = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/env.hbs"),
      "utf-8"
    )
  )({ network });

  const configFile = Handlebars.compile(
    readFileSync(path.join(__dirname, "../../templates/config.hbs"), "utf-8")
  )({ hardhatFolder, contract, network });

  const instructions = [
    `echo \"${configFile}\" > ${path.join(__dirname, "../../config.json")}`,
    `mkdir ${hardhatFolder}`,
    `cd ${hardhatFolder}`,
    `mkdir contracts`,
    `echo \"${hardhatConfigFile}\" >> hardhat.config.js`,
    `echo \"${contractFile}\" >> ./contracts/${toPascalCase(contract)}.sol`,
    `echo \"${dotEnvFile}\" >> .env`,
  ];
  await runInstructions(instructions);
  console.log(`✅ Created Hardhat skeleton project in '${hardhatFolder}'`);
  return hardhatFolder;
};
