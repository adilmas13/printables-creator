import runCommand from "./command.js";
import logger from "./logger.js";
import { existsSync, mkdirSync } from "fs";
import {
  DIGITAL_DOWNLOAD_LOGO,
  MOCK_1,
  MOCK_10,
  MOCK_11,
  MOCK_12,
  MOCK_13,
  MOCK_14,
  MOCK_15,
  MOCK_16,
  MOCK_2,
  MOCK_3,
  MOCK_4,
  MOCK_5,
  MOCK_6,
  MOCK_7,
  MOCK_8,
  MOCK_9,
} from "./config.js";

const mockUps: Array<MockData> = [
  {
    filename: MOCK_1,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 486, height: 689 },
      offset: { x: 862, y: 185 },
    },
  },
  {
    filename: MOCK_2,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 450, height: 647 },
      offset: { x: 858, y: 177 },
    },
  },
  {
    filename: MOCK_3,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 520, height: 742 },
      offset: { x: 285, y: 168 },
    },
  },
  {
    filename: MOCK_4,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 930, height: 1218 },
      offset: { x: 932, y: 324 },
    },
  },
  {
    filename: MOCK_5,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +60,
      offsetY: +60,
    },
    designPlacement: {
      dimension: { width: 936, height: 1360 },
      offset: { x: 492, y: 242 },
    },
  },
  {
    filename: MOCK_6,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 690, height: 940 },
      offset: { x: 720, y: 550 },
    },
  },
  {
    filename: MOCK_7,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +60,
      offsetY: +60,
    },
    designPlacement: {
      dimension: { width: 810, height: 1380 },
      offset: { x: 540, y: 300 },
    },
  },
  {
    filename: MOCK_8,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 768, height: 1005 },
      offset: { x: 1053, y: 180 },
    },
  },
  {
    filename: MOCK_9,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 504, height: 756 },
      offset: { x: 981, y: 123 },
    },
  },
  {
    filename: MOCK_10,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 519, height: 745 },
      offset: { x: 1194, y: 166 },
    },
  },
  {
    filename: MOCK_11,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 830, height: 1230 },
      offset: { x: 380, y: 320 },
    },
  },
  {
    filename: MOCK_12,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 900, height: 1360 },
      offset: { x: 200, y: 340 },
    },
  },
  {
    filename: MOCK_13,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 600, height: 980 },
      offset: { x: 650, y: 310 },
    },
  },
  {
    filename: MOCK_14,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 685, height: 870 },
      offset: { x: 920, y: 140 },
    },
  },
  {
    filename: MOCK_15,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 630, height: 910 },
      offset: { x: 220, y: 90 },
    },
  },
  {
    filename: MOCK_16,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthEast",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 550, height: 780 },
      offset: { x: 726, y: 192 },
    },
  },
];

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

const createMockup = ({
  directoryPath,
  design,
}: {
  directoryPath: string;
  design: string;
}) => {
  logger(`CREATING MOCKUP`);
  if (!existsSync(directoryPath)) mkdirSync(directoryPath);

  mockUps.forEach((data: MockData, index: number) => {
    const {
      filename: mockupPlaceholder,
      digitalDownload,
      designPlacement,
    } = data;
    const outputFile = `${directoryPath}/${index}.jpg`;
    adjustDesignWithinMockupPlaceholder(
      mockupPlaceholder,
      design,
      outputFile,
      designPlacement
    );
    addOverlay(outputFile, digitalDownload);
  });
};

export default createMockup;
