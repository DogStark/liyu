"use client";

import { useAuth } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";

export function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="flex h-14 items-center justify-between border-b bg-card px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-foreground">
                    {/* Dynamic Page Titles could go here */}
                    Overview
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <UserIcon className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block">
                        <p className="font-medium">{user?.name || "Guest"}</p>
                        <p className="text-xs text-muted-foreground">{user?.role || "No Role"}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="rounded-md p-2 text-muted-foreground hover:text-foreground"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
