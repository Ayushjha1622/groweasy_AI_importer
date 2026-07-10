"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PreviewActions() {

    const router = useRouter();

    return (

        <div className="mt-8 flex justify-end">

            <Button
                size="lg"
                onClick={() =>
                    router.push("/mapping")
                }
            >
                Continue to AI Mapping →
            </Button>

        </div>

    );
}