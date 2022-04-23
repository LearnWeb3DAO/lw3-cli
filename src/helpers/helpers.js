import { TRACKS } from "../constants/lw3";
import { textSync } from "figlet";
const chalk = require("chalk");

export const getProjectsFromTrack = (trackName) => {
  return TRACKS.filter((track) => track.name == trackName)[0].projects;
};

export const getProjectGenerator = (track, project) => {
  const projects = getProjectsFromTrack(track);
  return projects.map((projectFromList) =>
    projectFromList.name === project ? projectFromList.gen : null
  )[0];
};

export const toPascalCase = (value) =>{
  return `${value}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

export const getWelcomeMessage = () =>{
  console.log(chalk.blue(textSync("LW3-CLI", { horizontalLayout: "full" })));
}

export const getCLIInstructions = () =>{
  console.log(
    `
    lw3-cli\t\t Show up the whole options of the CLI
    lw3-cli --i:hardhat\t Install hardhat and the essential dependencies
    lw3-cli --g:hardhat\t Generate the hardhat common files
    lw3-cli --i:next\t Install next.js
    lw3-cli --g:hardhat\t Generate the next.js common files
    lw3-cli --help\t Show up the cli instructions
    `
  )
}