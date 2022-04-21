import { runInstructions } from "../../helpers";
import { installHardhat } from "../";
import { createNextApp } from "../";

export default {
  generate: async function () {
    await installHardhat();
    const next_folder = await createNextApp();
    const instructions = [
      `echo "export const abi = YOUR_ABI;\nexport const WHITELIST_CONTRACT_ADDRESS = 'YOUR_WHITELIST_CONTRACT_ADDRESS'" >> ${next_folder}/constants/index.js`,
    ];
    await runInstructions(instructions);
  },
};
