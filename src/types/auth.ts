export type UserRole = 'ADMIN' | 'INVENTORY_MANAGER' | 'PRODUCTION_MANAGER' | 'SALES';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
}

export const ROLES: Record<string, UserRole> = {
    ADMIN: 'ADMIN',
    INVENTORY_MANAGER: 'INVENTORY_MANAGER',
    PRODUCTION_MANAGER: 'PRODUCTION_MANAGER',
    SALES: 'SALES',
};
