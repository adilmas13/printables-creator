import child from "child_process";
import { LogColor, logger } from "./logger/index.js";

const runCommand = (command: string) => {
  logger(`RUNNING CMD > ${command}`, LogColor.grey);
  try {
    child.execSync(command);
  } catch (e) {
    logger(`FAILED TO RUN COMMAND : ${command}`, LogColor.red);
    console.log(e);
    throw e;
  }
};

export default runCommand;
