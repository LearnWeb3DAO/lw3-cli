import { runInstructions } from "../../helpers";
import { installHardhat } from "../";
import { installNext } from "../";
import generateHardhatFiles from "../backend/generateHardhatFiles";
import inquirer from "inquirer";

export default {
  generate: async function () {
    const { network } = await inquirer.prompt([
      {
        name: "network",
        type: "list",
        message: "Network: ",
        choices: ["Rinkeby", "Ropsten"],
        default: "Rinkeby",
      },
    ]);

    const hardhatFolder = await installHardhat(false, true, false);
    await generateHardhatFiles(
      false,
      hardhatFolder,
      network,
      "Whitelist",
      false
    );
    const nextFolder = await installNext(false);
    const instructions = [
      `mkdir ${nextFolder}/constants`,
      `echo "export const abi = YOUR_ABI;\nexport const WHITELIST_CONTRACT_ADDRESS = 'YOUR_WHITELIST_CONTRACT_ADDRESS'" >> ${nextFolder}/constants/index.js`,
    ];
    await runInstructions(instructions);
  },
};
