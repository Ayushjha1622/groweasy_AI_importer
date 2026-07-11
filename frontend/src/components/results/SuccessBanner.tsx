"use client";

import { CheckCircle2 } from "lucide-react";

export default function SuccessBanner() {

    return (

        <div className="flex items-start gap-4 rounded-xl border border-green-300 bg-green-50 p-5">

            <CheckCircle2
                size={32}
                className="text-green-600"
            />

            <div>

                <h2 className="font-semibold text-green-700">

                    Import Completed Successfully

                </h2>

                <p className="mt-1 text-green-600">

                    Your CRM data has been processed successfully.
                    You can review the imported records below or
                    download a report.

                </p>

            </div>

        </div>

    );

}