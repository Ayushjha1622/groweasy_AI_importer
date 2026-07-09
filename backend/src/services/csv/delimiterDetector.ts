import fs from "fs";

export function detectDelimiter(filePath: string): string {

    const firstLine = fs
        .readFileSync(filePath, "utf8")
        .split("\n")[0];

    const delimiters = [",", ";", "\t", "|"];

    let winner = ",";

    let max = 0;

    for (const delimiter of delimiters) {

        const count = firstLine.split(delimiter).length;

        if (count > max) {

            max = count;

            winner = delimiter;

        }

    }

    return winner;

}