import { existsSync, mkdirSync } from "fs";
import runCommand from "../command.js";
import { DPI, SIZES } from "../config.js";
import { LogColor, logger } from "../logger/index.js";

export const createDesign = ({
  designName,
  pageIndex,
  source,
  outputFolder,
}: {
  designName: string;
  pageIndex: number;
  source: string;
  outputFolder: string;
}) => {
  logger(`CREATING DESIGN : ${designName}`, LogColor.blue);

  if (!existsSync(outputFolder)) mkdirSync(outputFolder);

  SIZES.forEach((size) => {
    const [width, height] = size
      .split("x")
      .map((it) => +it)
      .map((it) => it * DPI);
    const outputFile = `${outputFolder}/${size}.jpg`;
    logger(`RESIZING DESIGN ${designName} TO : ${size}`, LogColor.green);
    const command = [
      `convert`,
      `${source}[${pageIndex}]`,
      `-quality 100`,
      `-resize ${width}x${height}^`,
      `-gravity center`,
      `-extent ${width}x${height}`,
      `-units PixelsPerInch -density ${DPI}`,
      `-type truecolor`,
      `-colorspace RGB`,
      `${outputFile}`,
    ].join(" ");
    runCommand(command);
  });
};
