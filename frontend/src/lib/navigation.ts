import {
  Upload,
  Table,
  BrainCircuit,
  LoaderCircle,
  BarChart3,
  History,
} from "lucide-react";

import { NavigationItem } from "@/types/navigation"

export const navigation: NavigationItem[] = [
  {
    title: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "Preview",
    href: "/dashboard/preview",
    icon: Table,
  },
  {
    title: "AI Mapping",
    href: "/dashboard/mapping",
    icon: BrainCircuit,
  },
  {
    title: "Processing",
    href: "/dashboard/processing",
    icon: LoaderCircle,
  },
  {
    title: "Results",
    href: "/dashboard/results",
    icon: BarChart3,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
];