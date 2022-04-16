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
  
  console.log(`✅ Created Next app in '${nextAppFolder}'`);
  return nextAppFolder;
};

export default createNextApp;
