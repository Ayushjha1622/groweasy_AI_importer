import { randomUUID } from "crypto";
import { ImportHistory } from "../types/history.types";

const history: ImportHistory[] = [];

class HistoryService {

    save(
        fileName: string,
        total: number,
        imported: number,
        skipped: number
    ) {

        console.log("Saving history...");

        history.unshift({

            id: randomUUID(),

            fileName,

            total,

            imported,

            skipped,

            successRate:
                total === 0
                    ? 0
                    : Math.round((imported / total) * 100),

            createdAt:
                new Date().toISOString()

        });

        console.log(history);

    }

    getAll() {

        console.log("Returning history");

        console.log(history);

        return history;

    }

}

export const historyService =
    new HistoryService();