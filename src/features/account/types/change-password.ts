import * as z from 'zod'
import { changePasswordSchema } from '../schemas/change-password-schema';


export type ChangePasswordFields = z.infer<ReturnType<typeof changePasswordSchema>>;