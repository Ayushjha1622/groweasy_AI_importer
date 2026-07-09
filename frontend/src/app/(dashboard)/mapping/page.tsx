"use client";

import { useRouter } from "next/navigation";

import { useUploadStore } from "@/store/upload.store";
import { useMappings } from "@/hooks/useMapping";

import MappingHeader from "@/components/mapping/MappingHeader";
import MappingTable from "@/components/mapping/MappingTable";
import AcceptMappingButton from "@/components/mapping/AcceptMappingButton";

export default function MappingPage() {

  const router = useRouter();

  const fileId = useUploadStore(
    state => state.fileId
  );

  const {
    data,
    isLoading,
  } = useMappings(fileId);

  if (!fileId) {
    return <p>No uploaded file.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">

      <MappingHeader />

      <MappingTable
        mappings={data?.mappings ?? []}
      />

      <AcceptMappingButton
        onClick={() =>
          router.push("/processing")
        }
      />

    </div>
  );
}