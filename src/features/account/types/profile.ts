import { IDocumentFields } from '@/shared/types/api';
import { profileSchema } from '../schemas/profile-schema';
import * as z from 'zod';


export interface IProfile extends IDocumentFields {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: "USER" | "ADMIN"; 
}

export interface IProfilePayload {
  user: IProfile;
}

export type ProfileFields = z.infer<ReturnType<typeof profileSchema>>;

export type UpdateProfilePayload = Partial<
  Pick<ProfileFields, "firstName" | "lastName" | "phone" | "profilePhoto">
>;
