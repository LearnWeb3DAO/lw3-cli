const inquirer = require("inquirer");
const path = require("path");
const Handlebars = require("handlebars");
const { readFileSync } = require("fs");
const { runInstructions } = require("../helpers");
const registerHelpers = require("./handlebarsHelpers");

registerHelpers(Handlebars);

/**
 * Prompts the user for a project name and network
 * and creates a Hardhat skeleton project
 * inside that directory. Generates a .env and
 * config file with the specified network
 * @returns {string} The directory in which the Next app was created in
 */

const createHardhat = async () => {
  const { hardhat_folder } = await inquirer.prompt([
    {
      name: "hardhat_folder",
      type: "input",
      message: "Hardhat folder name: ",
      default: "hardhat-tutorial",
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
  const hardhatConfig = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../templates/hardhat.config.hbs"),
      "utf-8"
    )
  )({ network });

  const dotEnv = Handlebars.compile(
    readFileSync(path.join(__dirname, "../templates/env.hbs"), "utf-8")
  )({ network });

  const instructions = [
    `mkdir ${hardhat_folder}`,
    `cd ${hardhat_folder}`,
    `npm init -y`,
    `npm install hardhat dotenv`,
    `npm install --save-dev @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle chai ethereum-waffle ethers`,
    `mkdir contracts test scripts`,
    `echo \"${hardhatConfig}\" >> hardhat.config.js`,
    `echo \"${dotEnv}\" >> .env`,
  ];
  runInstructions(instructions);
  console.log(`✅ Created Hardhat skeleton project in '${hardhat_folder}'`);
  return hardhat_folder;
};

module.exports = createHardhat;
