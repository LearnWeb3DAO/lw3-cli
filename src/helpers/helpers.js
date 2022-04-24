import { TRACKS } from "../constants/lw3";
import { textSync } from "figlet";
const chalk = require("chalk");
const path = require('path');
import fs from "fs"

export const getProjectsFromTrack = (trackName) => {
  return TRACKS.filter((track) => track.name == trackName)[0].projects;
};

export const getProjectGenerator = (track, project) => {
  const projects = getProjectsFromTrack(track);
  return projects.map((projectFromList) =>
    projectFromList.name === project ? projectFromList.gen : null
  )[0];
};

/**
 * Changes string case
 * @param {string} value - To change string to pascal case 
 * @returns {string} - The converted string
 */
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

// Shows a nice formatted welcome message into user
export const getWelcomeMessage = () =>{
  console.log(chalk.blue(textSync("LW3-CLI", { horizontalLayout: "full" })));
}

// Shows the cli usage into the user
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

/**
 * Automatically detects typescript/javascript template
 * @param {string} dir - Directory name to detect template in
 * @returns {string} - Wether "javascript" or "typescript" as per template detection
 */
export const getTemplateType = async (dir) =>{
// Selecting frontend or backend path as per argument that is passed
const directoryPath = dir === "frontend"
 ? path.join(process.cwd(), "pages")
 : process.cwd()

 // Reads files in the particular path to determine typescript/javascript template
 const files = await fs.promises.readdir(directoryPath)
 let file = dir === "frontend"
    ? await files.find(file => file.includes("index"))
    : await files.find(file => file.includes("hardhat.config"))
    
  // Determines typescript or javascript template
  const templateType = file === "index.js" || file === "hardhat.config.js"
  ? "javascript"
  : "typescript"
  

return templateType
}

/**
 * Remove spaces from the input
 * @param {string} value - The value to remove spaces from
 * @returns {string} - The cleand value
 */

export const trimInput = (value) =>{
  if(typeof value === "string"){
    return value.trim();
  }
}