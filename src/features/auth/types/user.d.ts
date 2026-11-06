import { USER_ROLES } from "../constants/user.constant";

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export interface User {
    id: string,
    username: string,
    email: string,
    phone: string | null,
    firstName: string,
    lastName: string,
    profilePhoto: string,
    emailVerified: boolean,
    phoneVerified: boolean,
    role: UserRole,
    createdAt: string,
}