import { existsSync, mkdirSync, readFileSync } from "fs";
import { PDFDocument } from "pdf-lib";
import runCommand from "./command.js";
import { RATIO_CHART_BLACK, RATIO_CHART_WHITE, SIZES } from "./config.js";
import { LogColor, logger } from "./logger/index.js";
import { createMockup } from "./mock-creator/index.js";
import { createDesign } from "./resizer/index.js";
import { timeConversion } from "./time-utils.js";

const [_, __, source] = process.argv;

const outputFolderName = (() => {
  return "output";
})();

const outputDirectory = `${source.substring(
  0,
  source.lastIndexOf("/") + 1
)}${outputFolderName}`;

const getTotalDesignCount = async (): Promise<number> => {
  const pdfFileArrayBuffer = readFileSync(source);
  const pdf = await PDFDocument.load(pdfFileArrayBuffer);
  return pdf.getPages().length;
};

const makeOutputDirectory = () => {
  if (!existsSync(outputDirectory)) {
    logger("CREATING OUTPUT DIRECTORY");
    mkdirSync(outputDirectory);
  }
};

const startTime = Date.now();

makeOutputDirectory();
const pageCount = await getTotalDesignCount();
logger(`TOTAL DESIGNS : ${pageCount}`, LogColor.magenta);

for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
  const designName = `design-${pageIndex + 1}`;
  const outputFolder = `${outputDirectory}/${designName}`;
  createDesign({ designName, pageIndex, source, outputFolder });
  const mockupFolder = `${outputFolder}/mockups`;
  createMockup({
    directoryPath: mockupFolder,
    design: `${outputFolder}/${SIZES[0]}.jpg`,
    designName,
    mockFor: pageIndex % 2 == 0 ? "BLACK" : "WHITE",
  });

  // Copy static assets to mockup directory
  const command = `cp ${
    pageIndex % 2 == 0 ? RATIO_CHART_BLACK : RATIO_CHART_WHITE
  } ${mockupFolder}`;
  runCommand(command);
}

runCommand(`open ${outputDirectory}`);

const endTime = Date.now();
const timeTakenToCompleted = endTime - startTime;

logger(`TOTAL TIME TO COMPLETE : ${timeConversion(timeTakenToCompleted)}`);
