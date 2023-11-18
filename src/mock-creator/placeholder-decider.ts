import {
  DIGITAL_DOWNLOAD_LOGO,
  MOCK_1,
  MOCK_10,
  MOCK_11,
  MOCK_12,
  MOCK_13,
  MOCK_15,
  MOCK_16,
  MOCK_2,
  MOCK_3,
  MOCK_4,
  MOCK_5,
  MOCK_6,
  MOCK_9,
} from "../config.js";

const BLACK_HERO_MOCK = MOCK_5;
const WHITE_HERO_MOCK = MOCK_5;

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
    mockFor: ["WHITE", "BLACK"],
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
    mockFor: ["WHITE", "BLACK"],
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
    mockFor: ["WHITE", "BLACK"],
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
    mockFor: ["BLACK"],
  },
  {
    filename: MOCK_5,
    digitalDownload: {
      filename: DIGITAL_DOWNLOAD_LOGO,
      position: "SouthWest",
      offsetX: +100,
      offsetY: +100,
    },
    designPlacement: {
      dimension: { width: 837, height: 1158 },
      offset: { x: 579, y: 456 },
    },
    mockFor: ["WHITE", "BLACK"],
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
      dimension: { width: 546, height: 760 },
      offset: { x: 720, y: 273 },
    },
    mockFor: ["BLACK"],
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
    mockFor: ["BLACK"],
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
    mockFor: ["WHITE", "BLACK"],
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
    mockFor: ["BLACK"],
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
    mockFor: ["BLACK"],
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
    mockFor: ["WHITE", "BLACK"],
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
    mockFor: ["WHITE", "BLACK"],
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
    mockFor: ["WHITE", "BLACK"],
  },
];

const getMockPlaceholder = (heroMockup: string, mocks: Array<MockData>) => {
  let finalMocks = mockUps.filter((it) => it.filename == heroMockup);
  const numberOfMocks = Math.min(mocks.length, 4);
  for (let i = 0; i < numberOfMocks; ++i) {
    const index = Math.floor(Math.random() * mocks.length);
    finalMocks = [...finalMocks, mocks[index]];
    mocks.splice(index, 1);
  }
  return finalMocks;
};

export const getBlackMockPlaceholder = () => {
  const mocks = mockUps
    .filter((it) => it.mockFor.includes("BLACK"))
    .filter((it) => it.filename != BLACK_HERO_MOCK);

  return getMockPlaceholder(BLACK_HERO_MOCK, mocks);
};

export const getWhiteMockPlaceholder = () => {
  const mocks = mockUps
    .filter((it) => it.mockFor.includes("WHITE"))
    .filter((it) => it.filename != WHITE_HERO_MOCK);

  return getMockPlaceholder(WHITE_HERO_MOCK, mocks);
};
