import { DatabaseZap } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-primary p-2 text-primary-foreground">
        <DatabaseZap className="h-5 w-5" />
      </div>

      <div>
        <h1 className="font-semibold">
          GrowEasy
        </h1>

        <p className="text-xs text-muted-foreground">
          AI CSV Importer
        </p>
      </div>
    </div>
  );
}