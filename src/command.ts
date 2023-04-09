import child from "child_process";
import logger from "./logger.js";

const runCommand = (command: string) => {
    console.log('RUNNING CMD > ', command);
    try {
        child.execSync(command);
    } catch (e) {
        logger(`FAILED TO RUN COMMAND : ${command}`);
        console.log(e);
        throw e;
    }
}

export default runCommand;