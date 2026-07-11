"use client";

import { useImportStore } from "@/store/import.store";

import ResultsHeader from "@/components/results/ResultsHeader";
import SummaryCards from "@/components/results/SummaryCards";
import ImportedTable from "@/components/results/ImportedTable";
import SkippedTable from "@/components/results/SkippedTable";
import ResultsActions from "@/components/results/ResultsActions";

export default function ResultsPage() {

    const result = useImportStore(
        state => state.result
    );

    if (!result) {

        return (

            <p>No import results available.</p>

        );

    }

    return (

        <div className="space-y-8">

            <ResultsHeader />
            
            <SummaryCards summary={result} />

            <ImportedTable
                rows={result.importedRecords}
            />

            <SkippedTable
                rows={result.skippedRecords}
            />

            <ResultsActions />

        </div>

    );

}