"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-background/70 px-8 backdrop-blur-xl">

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-3 top-3 text-muted-foreground"
          />

          <Input
            placeholder="Search..."
            className="w-80 pl-9"
          />

        </div>

      </div>

      <div className="flex items-center gap-4">

        <Bell
          size={20}
          className="cursor-pointer"
        />

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            A
          </div>

          <div>

            <p className="font-medium">
              Ayush Jha
            </p>

            <p className="text-xs text-muted-foreground">
              Software Developer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}