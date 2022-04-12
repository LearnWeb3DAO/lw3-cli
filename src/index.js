#!/usr/bin/env node
const { TRACKS } = require("./constants");
const inquirer = require("inquirer");
const { getProjectGenerator, getProjectsFromTrack } = require("./helpers");
const generators = require("./generators");

(async () => {
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
})();
