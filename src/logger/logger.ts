import chalk from "chalk";

export const logger = (log: string) => console.log("===> ", log);

const stuff = () => {
  chalk.red("hey");
};
