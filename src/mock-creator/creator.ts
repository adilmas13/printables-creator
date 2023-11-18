import { existsSync, mkdirSync } from "fs";
import runCommand from "../command.js";
import { LogColor, logger } from "../logger/index.js";
import {
  getBlackMockPlaceholder,
  getWhiteMockPlaceholder,
} from "./placeholder-decider.js";

const addOverlay = (inputFile: string, data: OverlayData) => {
  const { filename: overlayFile, position, offsetX, offsetY } = data;
  logger(`Adding Digital download logo to : ${inputFile}`);
  const digitalDownloadCommand = `convert ${inputFile} ${overlayFile} -gravity ${position} -geometry +${offsetX}+${offsetY} -composite ${inputFile}`;
  runCommand(digitalDownloadCommand);
};

const adjustDesignWithinMockupPlaceholder = (
  mockFile: string,
  design: string,
  outputFile: string,
  data: PlacementData
) => {
  const {
    dimension: { width, height },
    offset: { x, y },
  } = data;

  // Step 1: scale input image to proportionally to fit within the placeholder frame and save it as _temp.png
  let command = `convert ${design} -resize ${width}x${height}^ -gravity center -extent ${width}x${height} ${outputFile}`;
  runCommand(command);

  // Step 2: place the cropped _temp.png within the frame
  command = `convert ${mockFile} ${outputFile} -gravity NorthWest -geometry +${x}+${y} -composite ${outputFile}`;
  runCommand(command);
};

export const createMockup = ({
  directoryPath,
  design,
  designName,
  mockFor,
}: {
  directoryPath: string;
  design: string;
  designName: string;
  mockFor: MockFor;
}) => {
  logger(`CREATING MOCKUP : ${designName}`, LogColor.magenta);
  if (!existsSync(directoryPath)) mkdirSync(directoryPath);
  const mockUps =
    mockFor == "BLACK" ? getBlackMockPlaceholder() : getWhiteMockPlaceholder();
  mockUps.forEach((data: MockData, index: number) => {
    logger(`MOCKUP : ${index} for ${designName}`, LogColor.cyan);

    const {
      filename: mockupPlaceholder,
      digitalDownload,
      designPlacement,
    } = data;
    const outputFile = `${directoryPath}/${index + 1}.jpg`;
    adjustDesignWithinMockupPlaceholder(
      mockupPlaceholder,
      design,
      outputFile,
      designPlacement
    );
    addOverlay(outputFile, digitalDownload);
  });
};
