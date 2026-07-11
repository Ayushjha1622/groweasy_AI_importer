"use client";

import Logo from "../common/Logo";
import NavItem from "../common/NavItem";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { X } from "lucide-react";

import {
  Upload,
  Table,
  BrainCircuit,
  LoaderCircle,
  BarChart3,
  History,
  LayoutDashboard,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          // Base styles
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-card transition-transform duration-300 ease-in-out",
          // Mobile: slide in/out
          "lg:static lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo + close button */}
        <div className="flex items-center justify-between border-b p-6">
          <Logo />
          {/* Close button — only visible on mobile */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
          <NavItem
            href="/dashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            onNavigate={onClose}
          />

          <NavItem
            href="/upload"
            label="Upload"
            icon={Upload}
            onNavigate={onClose}
          />

          <NavItem
            href="/preview"
            label="Preview"
            icon={Table}
            onNavigate={onClose}
          />

          <NavItem
            href="/mapping"
            label="AI Mapping"
            icon={BrainCircuit}
            onNavigate={onClose}
          />

          <NavItem
            href="/processing"
            label="Processing"
            icon={LoaderCircle}
            onNavigate={onClose}
          />

          <NavItem
            href="/results"
            label="Results"
            icon={BarChart3}
            onNavigate={onClose}
          />

          <NavItem
            href="/history"
            label="History"
            icon={History}
            onNavigate={onClose}
          />
        </nav>

        <div className="p-4 border-t">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}