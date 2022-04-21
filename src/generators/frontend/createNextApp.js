import inquirer from "inquirer";
import { runInstructions } from "../../helpers";
import Handlebars from "handlebars";
import { registerHelpers } from "../../helpers";
import Listr from 'listr'

registerHelpers(Handlebars);

/**
 * Prompts the user for a directory
 * and creates a Next app with a constants
 * folder inside that directory
 * @returns {string} The directory in which the Next app was created in
 */

const createNextApp = async () => {
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
      title:"Installing nextjs",
      task:()=> runInstructions([`npx create-next-app ${nextAppFolder}`])
    }
   
    ])

  await tasks.run()
  
  console.log(`\n✅ Next app created in '${nextAppFolder}'`);
  console.log(`\nNow,you can either run ${chalk.blueBright('lw3-cli')} again-`)
  console.log("and choose 5th option or type the following shortcut command to generate common files!")
  console.log(chalk.blueBright("\t lw3-cli --gen:next\n"))
  return nextAppFolder;
};

export default createNextApp;
