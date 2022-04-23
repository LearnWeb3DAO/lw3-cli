/*
Barrel file
Make every function accessible by just importing helpers
e.g. import {registerHelpers} from "../helpers"
instead of import {registerHelpers} from "../helpers/handlebarsHelpers"
*/
export { registerHelpers } from "./handlebarsHelpers";
export { runInstructions } from "./runInstructions";
export {
getProjectGenerator,
getProjectsFromTrack,
getWelcomeMessage,
getCLIInstructions
} from "./helpers";
