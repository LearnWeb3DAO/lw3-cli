import { TRACKS } from "../constants/lw3";
import inquirer from "inquirer";
import { getProjectGenerator, getProjectsFromTrack } from "../helpers";
import generators from "../generators/lw3";
import chalk from "chalk";

async function lw3Generator() {
  const { track } = await inquirer.prompt([
    {
      name: "track",
      type: "list",
      message: "What track are you on?",
      choices: TRACKS.map((track) => track.name),
    },
  ]);
  const { project } = await inquirer.prompt([
    {
      name: "project",
      type: "list",
      message: "What project?",
      choices: getProjectsFromTrack(track),
    },
  ]);

  const generator = generators[getProjectGenerator(track, project)];
  generator.generate();
}

export default lw3Generator;
