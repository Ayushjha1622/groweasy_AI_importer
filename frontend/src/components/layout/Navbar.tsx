"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between glass-panel !border-x-0 !border-t-0 !border-b-white/5 bg-background/60 px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </Button>

        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <Input
            placeholder="Search across intelligence..."
            className="w-48 md:w-[400px] pl-10 bg-white/5 border-transparent focus-visible:ring-primary/50 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Bell
          size={20}
          className="cursor-pointer text-muted-foreground hover:text-foreground transition"
        />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            A
          </div>
          <div className="hidden xs:block">
            <p className="font-medium text-sm leading-none">
              Ayush Jha
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Software Developer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}