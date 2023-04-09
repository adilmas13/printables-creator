import runCommand from "./command.js";
import logger from "./logger.js";
import {existsSync, mkdirSync} from "fs";
import {DIGITAL_DOWNLOAD_LOGO, MOCK_1, MOCK_2} from "./config.js";

const mockUps: Array<MockData> = [{
    filename: MOCK_1, crop: {
        width: 3456, height: 3456, originX: 815, originY: 0
    }, digitalDownload: {
        filename: DIGITAL_DOWNLOAD_LOGO, position: "SouthWest", offsetX: +100, offsetY: +100
    }, placement: {
        resize: {width: 1930, height: 2896}, crop: {width: 1930, height: 2512}, position: {offsetX: 1774, offsetY: 527}
    }
},
    {
        filename: MOCK_2, crop: {
            width: 3000, height: 3000, originX: 0, originY: 0
        }, digitalDownload: {
            filename: DIGITAL_DOWNLOAD_LOGO, position: "SouthWest", offsetX: +100, offsetY: +100
        }, placement: {
            resize: {width: 1087, height: 1629}, crop: {width: 1087, height: 1475}, position: {offsetX: 1046, offsetY: 208}
        }
    }

];

const crop = (inputFile: string, outputFile: string, data: CropData) => {
    logger(`Cropping Mockup : ${inputFile}`);
    const {width, height, originX, originY} = data;
    const cropCommand = `convert ${inputFile} -crop ${width}x${height}+${originX}+${originY} -resize 2000x2000 ${outputFile}`;
    runCommand(cropCommand);
}

const addOverlay = (inputFile: string, data: OverlayData) => {
    const {filename: overlayFile, position, offsetX, offsetY} = data;
    logger(`Adding Digital download logo to : ${inputFile}`);
    const digitalDownloadCommand = `convert ${inputFile} ${overlayFile} -gravity ${position} -geometry +${offsetX}+${offsetY} -composite ${inputFile}`;
    runCommand(digitalDownloadCommand);
}

const adjustDesignWithinMockupPlaceholder = (mockFile: string, design: string, outputFile: string, data: PlacementData) => {
    const {resize, crop, position} = data;

    // Step 1: scale input image to proportionally to fit within the placeholder frame and save it as _temp.png
    let command = `convert ${design} -resize ${resize.width}x${resize.height} ${outputFile}`;
    runCommand(command);
    // Step 2: crop any excess height or width as it can overflow the frame due to proportional scaling
    command = `convert ${outputFile} -gravity center -crop ${crop.width}x${crop.height}+0+0 ${outputFile}`;
    runCommand(command);
    // Step 3: place the cropped _temp.png within the frame
    command = `convert ${mockFile} ${outputFile} -gravity NorthWest -geometry +${position.offsetX}+${position.offsetY} -composite ${outputFile}`;
    runCommand(command);
}

const createMockup = ({directoryPath, design}: { directoryPath: string; design: string }) => {
    logger(`CREATING MOCKUP`);
    if (!existsSync(directoryPath)) mkdirSync(directoryPath);

    mockUps.forEach((data: MockData, index: number) => {
        const {filename: mockupPlaceholder, crop: cropData, digitalDownload, placement} = data;
        const outputFile = `${directoryPath}/${index + 1}.jpg`;
        adjustDesignWithinMockupPlaceholder(mockupPlaceholder, design, outputFile, placement);
        // Always Crop first
        crop(outputFile, outputFile, cropData);
        // Followed by adding overlays
        addOverlay(outputFile, digitalDownload);
    });
}

export default createMockup;