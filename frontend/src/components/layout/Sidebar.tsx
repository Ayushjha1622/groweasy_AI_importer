"use client";

import Logo from "../common/Logo";
import NavItem from "../common/NavItem";

import {
  Upload,
  Table,
  BrainCircuit,
  LoaderCircle,
  BarChart3,
  History,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r bg-card lg:flex lg:flex-col">

      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">

        <NavItem
          href="/dashboard"
          label="Dashboard"
          icon={LayoutDashboard}
        />

        <NavItem
          href="/upload"
          label="Upload"
          icon={Upload}
        />

        <NavItem
          href="/preview"
          label="Preview"
          icon={Table}
        />

        <NavItem
          href="/mapping"
          label="AI Mapping"
          icon={BrainCircuit}
        />

        <NavItem
          href="/processing"
          label="Processing"
          icon={LoaderCircle}
        />

        <NavItem
          href="/results"
          label="Results"
          icon={BarChart3}
        />

        <NavItem
          href="/history"
          label="History"
          icon={History}
        />

      </nav>

    </aside>
  );
}