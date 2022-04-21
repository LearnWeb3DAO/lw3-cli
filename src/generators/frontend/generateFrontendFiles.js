import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { registerHelpers } from "../../helpers";
import chalk from "chalk";

registerHelpers(Handlebars);

/**
 * Prompts the user for a directory
 * and creates a Next app with a constants
 * folder inside that directory
 * @returns {string} The directory in which the Next app was created in
 */

const generateFrontendFiles = async () => {

  const { contract } = await inquirer.prompt([
    {
      name: "contract",
      type: "input",
      message: "Enter the contract name that you have deployed: ",
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

  console.log(network)
  console.log(contract)

  const constantTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/frontend/constant.hbs"),
      "utf-8"
    )
  )({ contract })

  const homePageTemplateContent = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/frontend/index.hbs"),
      "utf-8"
    )
  )({ network, contract })




  try {

    if (!existsSync('constants')) {
      mkdirSync('constants')
    }
    writeFileSync('pages/index.js', homePageTemplateContent)
    writeFileSync('constants/index.js', constantTemplateContent)

    console.log(chalk.greenBright('\n✅ The following files created successfully!'))
    console.log(path.join(process.cwd(), 'constants', 'index.js'))
    console.log(path.join(process.cwd(), 'pages', 'index.js'))


  } catch (error) {
    if (error.code = "ENOENT") {
      console.log('You are not in nextjs app directory')
    } else {
      throw error
    }
  }
};

export default generateFrontendFiles;
