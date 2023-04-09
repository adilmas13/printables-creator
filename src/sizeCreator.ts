import logger from "./logger.js";
import {existsSync, mkdirSync} from "fs";
import runCommand from "./command.js";
import {DPI, SIZES} from "./config.js";

export const createDesign = ({
                                 designName,
                                 pageIndex,
                                 source,
                                 outputFolder
                             }: { designName: string, pageIndex: number, source: string, outputFolder: string }) => {
    logger(`CREATING DESIGN : ${designName}`);

    if (!existsSync(outputFolder)) mkdirSync(outputFolder);

    SIZES.forEach(size => {
        const [width, height] = size.split("x").map(it => +it).map(it => it * DPI);
        const outputFile = `${outputFolder}/${size}.jpg`;
        logger(`RESIZING DESIGN ${designName} TO : ${size}`);
        let command = `convert ${source}[${pageIndex}] -quality 100 -resize ${width}x${height}^ -gravity center -extent ${width}x${height} ${outputFile}`;
        runCommand(command);

        command = `convert -units PixelsPerInch ${outputFile} -density ${DPI} ${outputFile}`;
        runCommand(command);
    });
}