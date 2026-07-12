import { Router } from "express";
import { healthController } from "../controllers/health.controller";
import path from "path";
import fs from "fs";
import { streamCSV } from "../services/csv/csvStream.service";

const router = Router();

router.get("/", healthController);

router.get("/test-stream", async (req, res, next) => {
    try {
        const uploadsDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadsDir)) {
            return res.status(404).json({ message: "Uploads directory does not exist." });
        }

        const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith(".csv"));
        if (files.length === 0) {
            return res.status(404).json({ message: "No CSV files found in uploads directory to test." });
        }
        
        // Find a larger file if possible or default to the first one
        const largeFile = files.find(f => {
            const stat = fs.statSync(path.join(uploadsDir, f));
            return stat.size > 1000; // Look for a file > 1KB
        }) || files[0];

        const testFile = path.join(uploadsDir, largeFile);
        console.log(`[TEST STREAM] Processing file: ${testFile}`);
        const rows = await streamCSV(testFile);
        
        console.log("Rows:", rows.length);
        console.log("First Row:", rows[0]);
        
        res.json({
            success: true,
            fileName: largeFile,
            rowsCount: rows.length,
            firstRow: rows[0]
        });
    } catch (err) {
        next(err);
    }
});

export default router;
