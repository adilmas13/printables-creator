import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { PDFDocument } from "pdf-lib";
import { timeConversion } from "./timeUtils.js";
import logger from "./logger.js";
import runCommand from "./command.js";
import { createDesign } from "./sizeCreator.js";
import createMockup from "./mockupCreator.js";
import { RATIO_CHART_BLACK, RATIO_CHART_WHITE, SIZES } from "./config.js";

const [_, __, source] = process.argv;

const outputFolderName = (() => {
  const temp = source.substring(source.lastIndexOf("/") + 1);
  // return temp.substring(0, temp.lastIndexOf('.'));
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

/*
 * zip is broken
 * currently zipped folder is empty
 * */
const zip = (directory: string) => {
  const tempFolder = `${directory}/designs`;
  if (!existsSync(tempFolder)) {
    mkdirSync(tempFolder);
  }

  readdirSync(directory).forEach((it) => {
    if (it.includes(".jpg")) {
      const command = `cp -r ${directory}/${it} ${tempFolder}`;
      runCommand(command);
    }
  });

  const zipCommand = `zip -r ${tempFolder}.zip ${tempFolder}`;
  runCommand(zipCommand);
};

const startTime = Date.now();

makeOutputDirectory();
const pageCount = Math.min(await getTotalDesignCount(), 2);
logger(`TOTAL DESIGNS : ${pageCount} <===`);

for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
  const designName = `design-${pageIndex + 1}`;
  const outputFolder = `${outputDirectory}/${designName}`;
  createDesign({ designName, pageIndex, source, outputFolder });
  const mockupFolder = `${outputFolder}/mockups`;
  createMockup({
    directoryPath: mockupFolder,
    design: `${outputFolder}/${SIZES[0]}.jpg`,
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
