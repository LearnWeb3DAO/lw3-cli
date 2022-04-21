import inquirer from "inquirer";
import { runInstructions } from "../../helpers";
import Handlebars from "handlebars";
import { registerHelpers } from "../../helpers";
import Listr from "listr";
import chalk from "chalk";

registerHelpers(Handlebars);

/**
 * Creates a barebones Next app
 * @param {boolean} verbose - Whether or not to print success messages/instructions
 * @returns {string} The folder in which the Next app was generated
 */

const createNextApp = async (verbose) => {
  const { nextAppFolder } = await inquirer.prompt([
    {
      name: "nextAppFolder",
      type: "input",
      message: "Enter next app folder name: ",
      default: "my-app",
    },
  ]);

  const tasks = new Listr([
    {
      title: "Installing Next.js",
      task: () => runInstructions([`npx create-next-app ${nextAppFolder}`]),
    },
  ]);

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
  return nextAppFolder;
};

export default createNextApp;
