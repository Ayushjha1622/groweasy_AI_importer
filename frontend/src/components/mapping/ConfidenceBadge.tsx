import { Badge } from "@/components/ui/badge";

interface Props {
  confidence: number;
}

export default function ConfidenceBadge({
  confidence,
}: Props) {
  let className = "";

  if (confidence >= 95) {
    className =
      "bg-green-100 text-green-700 border-green-300";
  } else if (confidence >= 75) {
    className =
      "bg-yellow-100 text-yellow-700 border-yellow-300";
  } else {
    className =
      "bg-red-100 text-red-700 border-red-300";
  }

  return (
    <Badge
      variant="outline"
      className={className}
    >
      {confidence}%
    </Badge>
  );
}