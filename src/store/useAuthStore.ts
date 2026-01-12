import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types/auth';
import { useState, useEffect } from 'react';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    hasRole: (role: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false, // Default to false so it doesn't block UI
            login: (user, token) => {
                console.log("Login action called:", user); // Debug log
                set({ user, token });
            },
            logout: () => set({ user: null, token: null }),
            hasRole: (allowedRoles) => {
                const user = get().user;
                if (!user) return false;
                return allowedRoles.includes(user.role);
            },
        }),
        {
            name: 'auth-storage',
            skipHydration: true, // we will manually rehydrate or let it happen, but avoiding mismatch is key
        }
    )
);

// precise hook to avoid hydration mismatch by ensuring we only return state after mount
export const useAuth = () => {
    const store = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        useAuthStore.persist.rehydrate(); // Manually trigger rehydrate on mount
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return {
            ...store,
            user: null, // Return null user during SSR
            isLoading: true, // Return loading during SSR
        }
    }

    return store;
};
