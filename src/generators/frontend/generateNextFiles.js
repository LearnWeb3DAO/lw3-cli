import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { registerHelpers } from "../../helpers";
import chalk from "chalk";
import { getTemplateType } from "../../helpers"

registerHelpers(Handlebars);

/**
 * Generates a constants file with the specified contract name and a basic homepage using web3modal
 * @param {boolean} verbose - Whether or not to print success messages/instructions
 * @param {*} contractName - The name of the contract, will be used when generating constants and won't prompt the user if specified
 */
const generateNextFiles = async (verbose = true, contractName) => {
  if (existsSync('pages')) {
    let extension = "js"

    // Determines wether the user uses typescript/javascript in frontend
    const templateType = await getTemplateType("frontend")

    if (templateType == "typescript") {
      extension = "tsx"
    }

    const { contract } =
      contractName ||
      (await inquirer.prompt([
        {
          name: "contract",
          type: "input",
          message: "Enter the contract name that you have deployed: ",
        },
      ]));

    const { network } = await inquirer.prompt([
      {
        name: "network",
        type: "list",
        message: "Network: ",
        choices: ["Rinkeby", "Ropsten"],
        default: "Rinkeby",
      },
    ]);

    const constantTemplateContent = Handlebars.compile(
      readFileSync(
        path.join(__dirname, "../../templates/frontend/constant.hbs"),
        "utf-8"
      )
    )({ contract });

    const homePageTemplateContent = Handlebars.compile(
      readFileSync(
        path.join(__dirname, "../../templates/frontend/index.hbs"),
        "utf-8"
      )
    )({ network, contract, templateType });

    try {
      if (!existsSync("constants")) {
        mkdirSync("constants");
      }
      writeFileSync(`pages/index.${extension}`, homePageTemplateContent);
      writeFileSync(`constants/index.${extension}`, constantTemplateContent);

      if (verbose) {
        console.log(
          chalk.greenBright("\n✅ The following files created successfully!")
        );
        console.log(path.join(process.cwd(), "constants", `index.${extension}`));
        console.log(path.join(process.cwd(), "pages", `index.${extension}`));
      }
    } catch (error) {
      if (error.code == "ENOENT") {
        console.log("You are not in a Next.js app directory");
      } else {
        throw error;
      }
    }
  } else {
    console.log(
      chalk.red(
        "Next.js directory is not found!\nPlease, switch to a directory where Next.js is installed!"
      )
    );
  }
};

export default generateNextFiles;
