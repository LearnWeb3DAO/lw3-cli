import inquirer from "inquirer";
import { runInstructions } from "../../helpers";
import * as data from '../../config.json'
import path from "path";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import { registerHelpers } from "../../helpers";

registerHelpers(Handlebars);

/**
 * Prompts the user for a directory
 * and creates a Next app with a constants
 * folder inside that directory
 * @returns {string} The directory in which the Next app was created in
 */

export const createNextApp = async () => {
  const { nextAppFolder } = await inquirer.prompt([
    {
      name: "nextAppFolder",
      type: "input",
      message: "Enter next app folder name: ",
      default: "my-app",
    },
  ]);
  
  const constantFile = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/frontend/constant.hbs"),
      "utf-8"
    )
  )({ "contract":data.network})

  const homePage = Handlebars.compile(
    readFileSync(
      path.join(__dirname, "../../templates/frontend/index.hbs"),
      "utf-8"
    )
  )({ "network":data.network, "contract":data.contract })

  console.log(nextAppFolder);
  const instructions = [
    `mkdir ${nextAppFolder}`,
    `cd ${nextAppFolder}`,
    `mkdir constants`,
    `mkdir pages`,
    `echo \"${constantFile}\" >> ./constants/index.js`,
    `echo \"${homePage}\" >> ./pages/index.js`,
  ];
  await runInstructions(instructions);
  console.log(`✅ Created Next app in '${nextAppFolder}'`);
  return nextAppFolder;
};

export default createNextApp;
