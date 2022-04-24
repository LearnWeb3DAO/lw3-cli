import inquirer from "inquirer";
import { runInstructions } from "../../helpers";
import Handlebars from "handlebars";
import { registerHelpers } from "../../helpers";
import Listr from "listr";
import chalk from "chalk";
import { install } from "pkg-install";
import { getTemplateType } from "../../helpers"
import path from 'path'
import { existsSync } from "fs";
import { trimInput } from "../../helpers/helpers";

registerHelpers(Handlebars);

/**
 * Creates a barebones Next app
 * @param {boolean} verbose - Whether or not to print success messages/instructions
 * @returns {string} The folder in which the Next app was generated
 */

const installNext = async (verbose = true) => {
  let { nextAppFolder } = await inquirer.prompt([
    {
      name: "nextAppFolder",
      type: "input",
      message: "Enter next app folder name: ",
      default: "my-app",
    },
  ]);
  nextAppFolder = trimInput(nextAppFolder)

  if (existsSync(nextAppFolder)) {
    return console.log(chalk.red(`${nextAppFolder} folder already exists`))
  } else {
    const { templateType } = await inquirer.prompt([
      {
        name: "templateType",
        type: "list",
        message: "Choose template",
        choices: ["javascript", "typescript"],
        default: "javascript",
      },
    ]);

    let instruction = templateType === "javascript"
      ? `npx create-next-app ${nextAppFolder}`
      : `npx create-next-app ${nextAppFolder} --typescript`

    const tasks = new Listr([
      {
        title: "Installing Next.js",
        task: () => runInstructions([instruction]),
      },
      {
        title: "Installing ethers",
        task: () =>
          install(
            {
              ethers: undefined,
            },
            {
              prefer: "npm",
              cwd: path.join(process.cwd(), nextAppFolder),
            }
          ),
      },
      {
        title: "Installing web3modal",
        task: () =>
          install(
            {
              web3modal: undefined,
            },
            {
              prefer: "npm",
              cwd: path.join(process.cwd(), nextAppFolder),
            }
          ),
      },
    ]);

    try {
      await tasks.run();

      if (verbose) {
        console.log(`\n✅ Next app created in '${nextAppFolder}'`);
        console.log(
          `\nNow,you can either run ${chalk.blueBright("lw3-cli")} again-`
        );
        console.log(
          "and choose 5th option or type the following shortcut command to generate common files!"
        );
        console.log(chalk.blueBright("\t lw3-cli --gen:next\n"));
      }
    } catch (error) {
      console.error(error)
    }
  }
  return nextAppFolder;
};

export default installNext;
