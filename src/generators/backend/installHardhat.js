import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import { registerHelpers } from "../../helpers";
import { runInstructions } from "../../helpers";
import { toPascalCase } from "../../helpers/helpers";
import Listr from 'listr'

import {install} from 'pkg-install'

registerHelpers(Handlebars);

/**
 * Prompts the user for a project name and network
 * and creates a Hardhat skeleton project
 * inside that directory. Generates a .env and
 * config file with the specified network
 * @returns {string} The directory in which the Next app was created in
 */

const installHardhat = async () => {
  const { hardhatFolder } = await inquirer.prompt([
    {
      name: "hardhatFolder",
      type: "input",
      message: "Hardhat folder name: ",
      default: "hardhat-tutorial",
    },
  ]);
  const { wantToInstallDotenv } = await inquirer.prompt([
    {
      name: "wantToInstallDotenv",
      type: "confirm",
      message: "Do you want to install dotenv package: ",
      default: true,
    },
  ]);

  const { wantToInstallOPenzeppelin } = await inquirer.prompt([
    {
      name: "wantToInstallOPenzeppelin",
      type: "confirm",
      message: "Do you want to install openzeppelin package: ",
      default: true,
    },
  ]);

  console.log("Generating Hardhat app...");

  const instructions = [
    `mkdir ${hardhatFolder}`,
    `cd ${hardhatFolder}`,
    `npm init --yes`
  ];

  const list = [
    {
      title: 'creating directory',
      task: () => runInstructions(instructions)
    },
    {
      title: 'Installing hardhat',
      task: () => install(
        {
          'hardhat': undefined,
        },
        {
          dev: true,
          prefer: 'npm',
          cwd: path.join(process.cwd(), hardhatFolder)
        }
      )
    },
   
  ]
  if(wantToInstallDotenv){
    list.push(
      {
        title: 'Installing dotenv',
        task: () => install(
          {
            'dotenv': undefined,
          },
          {
            prefer: 'npm',
            cwd: path.join(process.cwd(), hardhatFolder)
          }
        )
      }
    )
  }

  if (wantToInstallOPenzeppelin){
    list.push(
      {
        title: 'Installing openzeppelin',
        task: () => install(
          {
            '@openzeppelin/contracts': undefined,
          },
          {
            prefer: 'npm',
            cwd: path.join(process.cwd(), hardhatFolder)
          }
        )
      }
    )
  }

  const tasks = new Listr(list)

  try {
    await tasks.run()
    console.log(`✅ Created Hardhat skeleton project in '${hardhatFolder}'`);
    console.log('run the following commands to initiate the hardhat project and generate common files')
    console.log(`cd ${hardhatFolder}`)
    console.log("npx hardhat")
    console.log("lw3-cli gen backend")
      
  } catch (error) {
    console.error(error)
  }

  
  return hardhatFolder;
};

export default installHardhat;