import { log } from "./logger.js";
import fs from 'fs';

export function randomMedia(path: string, fileEndings: string[]) {
    try {
        var fileEndingsLengthsTotal = 0;
        var fileEndingsLengths = [];
        for (var i = 0; i < fileEndings.length; i++) {
            var length = fs.readdirSync(path).filter((file: string) => file.endsWith(fileEndings[i])).length
            fileEndingsLengths.push(length);
            fileEndingsLengthsTotal += length;
        }

        const luckyNumber = Math.random() * fileEndingsLengthsTotal;
        var cache = 0;
        for (var i = 0; i < fileEndings.length; i++) {
            cache += fileEndingsLengths[i];
            if (cache > luckyNumber) {
                var fileNumber = Math.floor(Math.random() * fileEndingsLengths[i]);
                return (path + fileNumber.toString() + fileEndings[i]);
            }
        }
    } catch (error) {
        log("error", error + " | " + path + " " + fileEndings);
        throw error;
    }
}