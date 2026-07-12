"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  onNavigate?: () => void;
}

export default function NavItem({
  href,
  label,
  icon: Icon,
  onNavigate,
}: NavItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300",

        active
          ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          : "text-muted-foreground border border-transparent hover:bg-white/5 hover:text-foreground"
      )}
    >
      <Icon size={18} />

      <span>{label}</span>
    </Link>
  );
}