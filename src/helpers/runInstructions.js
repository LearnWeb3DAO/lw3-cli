import util from "util";
import { exec } from "child_process";

const run = util.promisify(exec);

/**
 * Takes in an array of commands, combines them into one, then runs that command
 * @param {string[]} instructions - Commands to run
 */

export const runInstructions = async (instructions) => {
  try {
    const command = instructions.reduce(
      (prevInstruction, currInstruction) =>
        (prevInstruction += ` && ${currInstruction}`)
    );
    await run(command);
    
  } catch (error) {
    console.error(error)
  }
 
};
