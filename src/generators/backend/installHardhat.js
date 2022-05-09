/** @format */

import inquirer from 'inquirer';
import path from 'path';
import Handlebars from 'handlebars';
import { registerHelpers } from '../../helpers';
import { runInstructions } from '../../helpers';
import Listr from 'listr';
import chalk from 'chalk';
import { install } from 'pkg-install';
import { trimInput } from '../../helpers/helpers';
import { existsSync } from 'fs';

registerHelpers(Handlebars);

/**
 * Prompts the user for a name then creates a directory with that name and installs Hardhat, dotenv, and openZeppelin (if the user specifies to do so)
 * @param {boolean} verbose - Whether or not to print success messages/instructions
 * @param {boolean} installDotEnv - Whether or not to install dotEnv (if specified, it will not prompt the user)
 * @param {boolean} installOpenZeppelin - Whether or not to install OpenZeppelin (if specified, it will not prompt the user)
 * @returns {string} The folder where the Hardhat project was generated
 */

const installHardhat = async (
  verbose = true,
  installDotEnv,
  installOpenZeppelin
) => {
  let { hardhatFolder } = await inquirer.prompt([
    {
      name: 'hardhatFolder',
      type: 'input',
      message: 'Hardhat folder name: ',
      default: 'hardhat-tutorial',
    },
  ]);
  hardhatFolder = trimInput(hardhatFolder);
  if (existsSync(hardhatFolder)) {
    return console.log(chalk.red(`${hardhatFolder} directory already exists!`));
  } else {
    const { wantToInstallDotenv } =
      installDotEnv !== undefined
        ? { wantToInstallDotenv: installDotEnv }
        : await inquirer.prompt([
            {
              name: 'wantToInstallDotenv',
              type: 'confirm',
              message: 'Do you want to install dotenv package: ',
              default: true,
            },
          ]);

    const { wantToInstallOpenzeppelin } =
      installOpenZeppelin !== undefined
        ? { wantToInstallOpenzeppelin: installOpenZeppelin }
        : await inquirer.prompt([
            {
              name: 'wantToInstallOpenzeppelin',
              type: 'confirm',
              message: 'Do you want to install openzeppelin package: ',
              default: true,
            },
          ]);

    console.log('Generating Hardhat app...');

    const instructions = [
      `mkdir ${hardhatFolder}`,
      `cd ${hardhatFolder}`,
      `npm init --yes`,
    ];

    const list = [
      {
        title: 'Creating directory',
        task: () => runInstructions(instructions),
      },
      {
        title: 'Installing Hardhat',
        task: () =>
          install(
            {
              hardhat: undefined,
            },
            {
              dev: true,
              prefer: 'npm',
              cwd: path.join(process.cwd(), hardhatFolder),
            }
          ),
      },
    ];
    if (wantToInstallDotenv) {
      list.push({
        title: 'Installing dotenv',
        task: () =>
          install(
            {
              dotenv: undefined,
            },
            {
              prefer: 'npm',
              cwd: path.join(process.cwd(), hardhatFolder),
            }
          ),
      });
    }

    if (wantToInstallOpenzeppelin) {
      list.push({
        title: 'Installing openzeppelin',
        task: () =>
          install(
            {
              '@openzeppelin/contracts': undefined,
            },
            {
              prefer: 'npm',
              cwd: path.join(process.cwd(), hardhatFolder),
            }
          ),
      });
    }

    const tasks = new Listr(list);

    try {
      await tasks.run();

      if (verbose) {
        console.log(
          chalk.greenBright(`\n✅ Dependencies are installed successfully!`)
        );
        console.log(
          'Begin by typing the following commands to initiate the hardhat project!'
        );
        console.log(chalk.blueBright(`\t cd ${hardhatFolder}`));
        console.log(chalk.blueBright('\t npx hardhat'));

        console.log(
          `\nOnce the hardhat project is initiated,You can either run ${chalk.blueBright(
            'lw3-cli'
          )} again-`
        );
        console.log(
          'and choose 3rd option or type the following shortcut command to generate common files!'
        );
        console.log(chalk.blueBright('\t lw3-cli --gen:hardhat\n'));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return hardhatFolder;
};

export default installHardhat;
