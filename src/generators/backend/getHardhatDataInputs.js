import inquirer from "inquirer";
import Handlebars from "handlebars";
import { registerHelpers } from "../../helpers";
import generateHardhatFiles from './generateHardhatFiles'

registerHelpers(Handlebars);

/**
 * Prompts the user for a project name and network
 * and creates a Hardhat skeleton project
 * inside that directory. Generates a .env and
 * config file with the specified network
 * @returns {string} The directory in which the Next app was created in
 */



const getHardhatDataInputs = async () => {

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

   const {openzeppelinConfirmation} = await inquirer.prompt([
    {
      name: "openzeppelinConfirmation",
      type: "confirm",
      message: "Do you want to implement openzeppelin token standards?",
      default: false
    }
  ])

  if(openzeppelinConfirmation){
   
    const {tokenType} = await inquirer.prompt([{
      name:"tokenType",
      type: "list",
      message: "Select token type:",
      choices: [
        "ERC1155",
        "ERC20",
        "ERC721"
      ]

    }])

    const {tokenName} = await inquirer.prompt([{
      name: "tokenName",
      type: "input",
      message:"Enter token name:",

    }])

    const {tokenSymbol} = await inquirer.prompt([{
      name: "tokenSymbol",
      type: "input",
      message: "Enter token symbol:"
    }])

    generateHardhatFiles(
      network,
      contract,
      openzeppelinConfirmation,
      tokenType,
      tokenName,
      tokenSymbol)
  
  }

  else{
    generateHardhatFiles(
      network,
      contract,
      openzeppelinConfirmation)
  }
};

export default getHardhatDataInputs;