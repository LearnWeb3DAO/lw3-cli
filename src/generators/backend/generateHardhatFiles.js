import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { toPascalCase } from "../../helpers/helpers";
const chalk = require("chalk");

/**
 * Generates Hardhat files such as a contract, a basic deploy script, and a .env file
 * @param {boolean} verbose - Whether or not to print success messages/instructions
 * @param {string} hardhatFolder - Folder where the Hardhat project is
 * @param {string} network - The network to deploy the contract to
 * @param {string} contract - Name of the generated contract
 * @param {boolean} openzeppelinConfirmation - Whether or not to prompt about OpenZeppelin
 * @param {string} tokenType - OpenZeppelin token standard
 * @param {string} tokenName - Name of the generated token
 * @param {string} tokenSymbol - Symbol of the gene
 */

const generateHardhatFiles = async (
  verbose,
  hardhatFolder = "./",
  network,
  contract,
  openzeppelinConfirmation,
  tokenType = "",
  tokenName = "",
  tokenSymbol = ""
) => {
  const hardhatConfigTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/hardhat.config.hbs"),
      "utf-8"
    )
  )({ network });

  const deployTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/deploy.hbs"),
      "utf-8"
    )
  )({ contract });

  const contractTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/contract.hbs"),
      "utf-8"
    )
  )({ contract, openzeppelinConfirmation, tokenType, tokenName, tokenSymbol });

  const dotEnvTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/backend/env.hbs"),
      "utf-8"
    )
  )({ network });

  const hardhatPath = path.join(process.cwd());

  try {
    const { confirmation } = verbose
      ? await inquirer.prompt([
          {
            name: "confirmation",
            type: "confirm",
            message:
              "Do you want to replace the common files to auto generate the essential code?",
            default: true,
          },
        ])
      : { confirmation: true };
    if (confirmation) {
      mkdirSync(`${hardhatFolder}/contracts`);
      mkdirSync(`${hardhatFolder}/scripts`);
      writeFileSync(
        `${hardhatFolder}/contracts/${toPascalCase(contract)}.sol`,
        contractTemplateContent
      );
      writeFileSync(`${hardhatFolder}/.env`, dotEnvTemplateContent);
      writeFileSync(
        `${hardhatFolder}/hardhat.config.js`,
        hardhatConfigTemplateContent
      );
      writeFileSync(
        `${hardhatFolder}/scripts/deploy.js`,
        deployTemplateContent
      );

      let contractFileName = toPascalCase(contract);
      if (verbose) {
        console.log(
          chalk.greenBright("\n✅ The following files created successfully!")
        );
        console.log(
          path.join(hardhatPath, "contracts", contractFileName + ".sol")
        );
        console.log(path.join(hardhatPath, ".env"));
        console.log(path.join(hardhatPath, "hardhat.config.js"));
        console.log(path.join(hardhatPath, "scripts", "deploy.js"));
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default generateHardhatFiles;
