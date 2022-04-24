import inquirer from "inquirer";
import Handlebars from "handlebars";
import { registerHelpers } from "../../helpers";
import generateHardhatFiles from "./generateHardhatFiles";
import { getTemplateType } from "../../helpers"
import { existsSync } from "fs"
import chalk from "chalk"
import { trimInput } from "../../helpers/helpers";
registerHelpers(Handlebars);

/**
 * Prompts the user for data including the name of the contract to be generated,
 * the network to deploy the contract to, and, if the user wants, what OpenZeppelin standards to override
 * It will then call generateHardhatFiles with the data
 * @param {boolean} verbose - Whether or not to print success messages/instructions

 */

const getHardhatDataInputs = async () => {
  if (existsSync("contracts")) {
    let extension = "js"

    //Determine wether the user uses typescript/javascript in backend

    const templateType = await getTemplateType("backend")

    if (templateType === "typescript") {
      extension = "ts"
    }
    let { contract } = await inquirer.prompt([
      {
        name: "contract",
        type: "input",
        message: "Enter contract name: ",
        validate: async (input) => {
          if (input.length == 0) {
             return 'contract name can not be empty';
          }
          return true;
       }
      },
    ]);
    contract = trimInput(contract)

    const { network } = await inquirer.prompt([
      {
        name: "network",
        type: "list",
        message: "Network: ",
        choices: ["Rinkeby", "Ropsten"],
        default: "Rinkeby",
      },
    ]);

    const { openzeppelinConfirmation } = await inquirer.prompt([
      {
        name: "openzeppelinConfirmation",
        type: "confirm",
        message: "Do you want to implement openzeppelin token standards?",
        default: false,
      },
    ]);

    if (openzeppelinConfirmation) {
      const { tokenType } = await inquirer.prompt([
        {
          name: "tokenType",
          type: "list",
          message: "Select token type:",
          choices: ["ERC1155", "ERC20", "ERC721"],
        },
      ]);

      const { tokenName } = await inquirer.prompt([
        {
          name: "tokenName",
          type: "input",
          message: "Enter token name:",
          validate: async (input) => {
            if (input.length == 0) {
               return 'token name can not be empty';
            }
            return true;
         }
        },
      ]);

      const { tokenSymbol } = await inquirer.prompt([
        {
          name: "tokenSymbol",
          type: "input",
          message: "Enter token symbol:",
          validate: async (input) => {
            if (input.length == 0) {
               return 'token symbol can not be empty';
            }
            return true;
         }
        },
      ]);

      generateHardhatFiles(
        true,
        extension,
        network,
        contract,
        openzeppelinConfirmation,
        tokenType,
        tokenName,
        tokenSymbol
      );

    } else {
      generateHardhatFiles(true, extension, network, contract, openzeppelinConfirmation);
    }
  } else {
    console.log(
      chalk.red(
        "Hardhat directory is not found!\nPlease, switch to a directory where Hardhat is installed!"
      )
    );
  }
};

export default getHardhatDataInputs;
