#!/usr/bin/env node
'use strict';

const { TRACKS } = require("../../constants");
const inquirer = require("inquirer");
const { getProjectsFromTrack, getProjectGenerator } = require("../../helpers/helpers");

async function boilerplateGenerator(){
  const { track } = await inquirer.prompt([
    {
      name: "track",
      type: "list",
      message: "What track are you on?",
      choices: TRACKS.map((track) => track.name),
    },
  ]);
  await inquirer.prompt([
    {
      name: "project",
      type: "list",
      message: "What project?",
      choices: getProjectsFromTrack(track),
    },
  ]);
}

module.exports = {
  boilerplateGenerator
}
