import { forgotPasswordSchema, resetPasswordSchema } from './../schemes/auth.schema';
import { CREATE_ACCOUNT_STEPS } from "@/shared/constants/auth.constant";
import { loginSchema } from "../schemes/login.schema";
import { User } from "./user";
import { accountInfoSchema, createPasswordSchema, emailStepSchema, otpStepSchema, OtpStepSchema, registerSchema, verificationSchema } from "../schemes/auth.schema";


export type LoginFields = z.infer<typeof loginSchema>
export interface LoginResponse{
    token: string,
    user: User
}

export type CreateAccountSteps = (typeof CREATE_ACCOUNT_STEPS)[keyof typeof CREATE_ACCOUNT_STEPS];

export type ForgotPasswordSteps =(typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type StepContent = {
  title?: string;
  subTitle?: string;
  description?: React.ReactNode;
  form: React.ReactNode;
};

export type Translations = Awaited<ReturnType<typeof getTranslations>>;

export type EmailStepFields = z.infer<ReturnType<typeof emailStepSchema>>

export type OtpStepFields = z.infer<ReturnType<typeof otpStepSchema>>;

export type VerificationFields = z.infer<ReturnType<typeof verificationSchema>>;

export type AccountInfoFields = z.infer<ReturnType<typeof accountInfoSchema>>

export type CreatePasswordFields = z.infer<ReturnType<typeof createPasswordSchema>>

export type RegisterFields = z.infer<ReturnType<typeof registerSchema>>

export type ResetPasswordFields = z.infer<ReturnType<typeof resetPasswordSchema>>


