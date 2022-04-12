const { TRACKS } = require("../constants");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

/**
 * Takes in an array of commands, combines them into one, then runs that command
 * @param {string[]} instructions - Commands to run
 */

const runInstructions = async (instructions) => {
  const command = instructions.reduce(
    (prevInstruction, currInstruction) =>
      (prevInstruction += ` && ${currInstruction}`)
  );
  await exec(command);
};

const getProjectsFromTrack = (trackName) => {
  return TRACKS.filter((track) => track.name == trackName)[0].projects;
};

const getProjectGenerator = (track, project) => {
  const projects = getProjectsFromTrack(track);
  return projects.map((projectFromList) =>
    projectFromList.name === project ? projectFromList.gen : null
  )[0];
};

module.exports = {
  getProjectsFromTrack,
  getProjectGenerator,
  runInstructions,
};
