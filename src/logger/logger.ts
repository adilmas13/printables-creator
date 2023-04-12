import chalk from "chalk";

export enum LogColor {
  blue,
  green,
  magenta,
  grey,
  cyan,
  red,
}
export const logger = (log: string, color?: LogColor) => {
  const message = (() => {
    switch (color) {
      case LogColor.blue:
        return chalk.blue(log);
      case LogColor.green:
        return chalk.green(log);
      case LogColor.magenta:
        return chalk.magenta(log);
      case LogColor.grey:
        return chalk.grey(log);
      case LogColor.cyan:
        return chalk.cyan(log);
      case LogColor.red:
        return chalk.red(log);
      default:
        return log;
    }
  })();

  console.log("===> ", message);
};
