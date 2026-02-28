"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileEdit,
  Palette,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard#editor", label: "Page Editor", icon: FileEdit },
  { href: "/dashboard#themes", label: "Themes", icon: Palette },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  username?: string;
}

export function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="w-64 min-h-screen bg-[#111111] border-r border-[#262626] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#262626]">
        <Link href="/" className="text-xl font-mono font-bold tracking-tight">
          <span className="text-[#8B5CF6]">k</span>ikaru
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#8B5CF6]/10 text-[#8B5CF6]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        {username && (
          <Link
            href={`/u/${username}`}
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Public Page
          </Link>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#262626]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#A1A1AA] hover:text-red-400 hover:bg-red-400/5 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
