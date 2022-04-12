import inquirer from "inquirer";
import { runInstructions } from "../../helpers";

/**
 * Prompts the user for a directory
 * and creates a Next app with a constants
 * folder inside that directory
 * @returns {string} The directory in which the Next app was created in
 */

export const createNextApp = async () => {
  const { next_folder } = await inquirer.prompt([
    {
      name: "next_folder",
      type: "input",
      message: "Next folder name: ",
      default: "my-app",
    },
  ]);
  console.log("Generating Next app...");
  const instructions = [
    `npx create-next-app ${next_folder}`,
    `mkdir ${next_folder}/constants`,
  ];
  await runInstructions(instructions);
  console.log(`✅ Created Next app in '${next_folder}'`);
  return next_folder;
};

export default createNextApp;
