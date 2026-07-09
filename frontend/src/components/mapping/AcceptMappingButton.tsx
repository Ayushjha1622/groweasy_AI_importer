"use client";

import { Button } from "@/components/ui/button";

interface Props {
  onClick(): void;
}

export default function AcceptMappingButton({
  onClick,
}: Props) {
  return (
    <div className="mt-8 flex justify-end">

      <Button
        size="lg"
        onClick={onClick}
      >
        Accept Mapping
      </Button>

    </div>
  );
}