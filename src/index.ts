import {existsSync, mkdirSync, readdirSync, readFileSync} from 'fs';
import {PDFDocument} from 'pdf-lib';
import {timeConversion} from "./timeUtils.js";
import logger from "./logger.js";
import runCommand from "./command.js";
import createMockup from "./mockupCreator.js";

const [_, __, filePath] = process.argv;

const outputFolderName = (() => {
    const temp = filePath.substring(filePath.lastIndexOf('/') + 1);
    // return temp.substring(0, temp.lastIndexOf('.'));
    return 'output'
})();

const outputDirectory = `${filePath.substring(0, filePath.lastIndexOf('/') + 1)}${outputFolderName}`;

const getTotalDesignCount = async (): Promise<number> => {
    const pdfFileArrayBuffer = readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfFileArrayBuffer);
    return pdf.getPages().length;
};

const makeOutputDirectory = () => {
    if (!existsSync(outputDirectory)) {
        logger('CREATING OUTPUT DIRECTORY');
        mkdirSync(outputDirectory)
    }
}

/*
* zip is broken
* currently zipped folder is empty
* */
const zip = (directory: string) => {
    const tempFolder = `${directory}/designs`;
    if (!existsSync(tempFolder)) {
        mkdirSync(tempFolder);
    }

    readdirSync(directory).forEach(it => {
        if (it.includes(".jpg")) {
            const command = `cp -r ${directory}/${it} ${tempFolder}`;
            runCommand(command);
        }
    });

    const zipCommand = `zip -r ${tempFolder}.zip ${tempFolder}`;
    runCommand(zipCommand);
}

const createDesign = (index: number) => {
    logger(`CREATING DESIGN : ${index}`);
    const directoryName = `design-${index}`;
    const directoryPath = `${outputDirectory}/${directoryName}`;
    if (!existsSync(directoryPath)) mkdirSync(directoryPath);

    const sizes = ["16x20", "18x24", "24x36", "10x14", "11x14"];
    const dpi = 300;

    sizes.forEach(size => {
        const [width, height] = size.split("x").map(it => +it).map(it => it * dpi);
        const outputFile = `${directoryPath}/${size}.jpg`;
        logger(`RESIZING DESIGN ${index} TO : ${size}`);
        let command = `convert ${filePath}[${index}] -quality 100 -resize ${width}x${height}^ -gravity center -extent ${width}x${height} ${outputFile}`;
        runCommand(command);

        command = `convert -units PixelsPerInch ${outputFile} -density ${dpi} ${outputFile}`;
        runCommand(command);
    });
    createMockup(directoryPath, `${directoryPath}/24x36.jpg`);
    // zip(directoryPath);
}

const startTime = Date.now();

makeOutputDirectory();
const pageCount = await getTotalDesignCount();
logger(`TOTAL DESIGNS : ${pageCount} <===`);

for (let i = 0; i < pageCount; i++) {
    createDesign(i);
}

runCommand(`open ${outputDirectory}`);

const endTime = Date.now();
const timeTakenToCompleted = endTime - startTime;

logger(`TOTAL TIME TO COMPLETE : ${timeConversion(timeTakenToCompleted)}`);