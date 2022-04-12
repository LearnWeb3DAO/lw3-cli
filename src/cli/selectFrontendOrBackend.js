import inquirer from "inquirer";
import { createHardhat } from "../generators";
import { createNextApp } from "../generators";

async function selectFrontendOrBackend() {
  const options = [];
  options.push({
    type: "list",
    name: "option",
    message: "select generator type: ",
    choices: ["Backend", "Frontend"],
  });

  const answers = await inquirer.prompt(options);

  // preparing backend
  if (answers.option == "Backend") {
    createHardhat();
  }

  // preparing frontend
  else {
    createNextApp();
  }
}

export default selectFrontendOrBackend;
