# GrowEasy AI Importer

An intelligent, AI-powered CSV import tool that uses LLMs to automatically map unpredictable, messy CSV headers to a standard schema and seamlessly import records into your system. Built with Next.js, Node.js, and Google Gemini AI.

## Project Overview

Importing CSV data is often painful for users. Columns don't match, data types are wrong, and basic mappings fail. GrowEasy AI Importer solves this by leveraging AI (Google Gemini) to read a small chunk of the uploaded CSV, infer its contents, and automatically map its headers to your required destination fields.

## Features

- **AI-Powered Header Mapping**: Upload any CSV with arbitrary headers, and the AI will accurately map them to the destination schema.
- **Robust Import Processing**: Safely processes thousands of rows, skipping invalid rows while continuing the import.
- **Detailed Analytics Dashboard**: Visualizes import trends (Recharts), success rates, and recent activity history.
- **Data Previews**: Full spreadsheet-like preview with horizontal scrolling and data insights before import.
- **Comprehensive Reports**: Export import results as PDF, JSON, or CSV (for both successful and skipped records).
- **Dark Mode Support**: Beautiful light and dark themes via `next-themes`.
- **Friendly UX**: Skeletons, empty states, and toast notifications (Sonner) make for a premium experience.

## Architecture

1. **Frontend**: Next.js App Router (React) using TailwindCSS and Shadcn UI. State is managed via Zustand, and API calls via TanStack Query.
2. **Backend**: Express.js REST API. Uses `multer` for file uploads, `csv-parser` for data ingestion, and `@google/genai` for AI mapping.
3. **Database Layer**: In-memory data store for this demonstration (simulated services for upload, parsing, and saving).

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Lucide Icons, Recharts, Zustand, React Query, jsPDF.
- **Backend**: Node.js, Express, Multer, CSV-Parser, Google GenAI SDK.

## How AI Mapping Works

When a CSV is uploaded, the backend immediately extracts the **first 5 rows** along with the headers and sends them to the Gemini LLM with a strict JSON schema prompt. 

The prompt instructs the AI to look at the required destination schema (e.g. `firstName`, `lastName`, `email`, `phone`, `company`) and intelligently pair them with the actual CSV columns (e.g. `First Name`, `Last_Name`, `Email Address`, `Phone Number`, `Company Name`).

The AI responds with a JSON mapping object, which the frontend allows the user to review and override. The backend then uses this finalized mapping to process the entire CSV, ensuring missing or invalid fields are properly caught and skipped.

## API Endpoints

- `POST /api/upload`: Uploads a CSV and extracts sample data and headers.
- `POST /api/mapping`: Uses Gemini to generate AI mapping suggestions based on sample rows.
- `POST /api/import`: Processes the full CSV using the finalized mapping, returning detailed success/skip stats.
- `GET /api/dashboard`: Retrieves dashboard analytics, trends, and recent import history.

## Folder Structure

```
groweasy_Ai_Importer/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   └── store/
```

## Installation

### Backend Setup
```bash
cd backend
npm install
# Create a .env file and add your GEMINI_API_KEY
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:3000`.

## Screenshots

*(Replace these links with actual screenshots of your application)*

- **Dashboard**: [Dashboard.png](#)
- **Upload**: [Upload.png](#)
- **Preview**: [Preview.png](#)
- **AI Mapping**: [AIMapping.png](#)
- **Processing**: [Processing.png](#)
- **Results**: [Results.png](#)
- **History**: [History.png](#)

## Future Improvements

- Add Database (PostgreSQL) instead of in-memory maps.
- Support real-time WebSocket progress updates for the processing stage instead of polling.
- Allow users to define custom schemas instead of hardcoding the destination schema.
- Add background worker processing (BullMQ / Redis) for massive CSV files (1M+ rows).
