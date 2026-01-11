"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Factory,
    Warehouse,
    PieChart,
    Settings,
    Users,
    LucideIcon
} from "lucide-react";
import { useAuth } from "@/store/useAuthStore";
import { UserRole } from "@/types/auth";
import { cn } from "@/lib/utils";

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    roles: UserRole[];
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        roles: ["ADMIN", "INVENTORY_MANAGER", "PRODUCTION_MANAGER", "SALES"],
    },
    {
        title: "Inventory",
        href: "/inventory",
        icon: Package,
        roles: ["ADMIN", "INVENTORY_MANAGER", "PRODUCTION_MANAGER"],
    },
    {
        title: "Production",
        href: "/production",
        icon: Factory,
        roles: ["ADMIN", "PRODUCTION_MANAGER"],
    },
    {
        title: "Warehouses",
        href: "/warehouses",
        icon: Warehouse,
        roles: ["ADMIN", "INVENTORY_MANAGER"],
    },
    {
        title: "Reports",
        href: "/reports",
        icon: PieChart,
        roles: ["ADMIN", "SALES", "INVENTORY_MANAGER"],
    },
    {
        title: "User Management",
        href: "/users",
        icon: Users,
        roles: ["ADMIN"],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { hasRole } = useAuth();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package className="h-6 w-6" />
                    <span>IMS v1.0</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                    {navItems.map((item) => {
                        if (!hasRole(item.roles)) return null;

                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                    isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
            </div>
        </div>
    );
}
