import { z } from "zod";
import { Translations } from "../types/auth";
import { isValidPhoneNumber } from "libphonenumber-js";

export const loginSchema = z
  .object({
    username: z.string("Invalid username").nonempty("Username is required"),
    password: z.string("Invalid password").nonempty("Password is required"),
  })
  .strict();

//email verification step

// const emailStepSchema = (t:Translations)=> registerSchema(t).pick({email: true})

export const emailStepSchema = (t: Translations) =>
  z.object({
    email: z
      .string()
      .nonempty(t("email-is-required"))
      .email(t("invalid-email")),
  });

// const emailStepSchema = (t:Translations)=> registerSchema(t).pick({email: true})

export const otpStepSchema = (t: Translations) =>
  z.object({
    otp: z.string().min(6, t("otp-is-required")),
  });

export const verificationSchema = (t: Translations) =>
  emailStepSchema(t).merge(otpStepSchema(t));

export const accountInfoSchema = (t: Translations) =>
  z.object({
    firstName: z.string().nonempty(t("first-name-is-required")),

    lastName: z.string().nonempty(t("last-name-is-required")),

    username: z
      .string()
      .nonempty(t("username-is-required"))
      .min(2, t("user-name-min", { min: 2 })),

    phone: z
      .string()
      .nonempty(t("phone-is-required"))
      .refine((value) => isValidPhoneNumber(value), t("invalid-phone")),
  });


export const passwordFieldSchema = (t: Translations) =>
  z.string()
    .nonempty(t("password-is-required"))
    .min(8, t("password-min-length"))
    .regex(/[A-Z]/, t("password-uppercase-required"))
    .regex(/[0-9]/, t("password-number-required"))
    .regex(/[^A-Za-z0-9]/, t("password-special-character-required"));

export const createPasswordSchema = (t: Translations) =>
  z
    .object({
      password: passwordFieldSchema(t),
      confirmPassword: z.string().nonempty(t("confirm-password-is-required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-do-not-match"),
      path: ["confirmPassword"],
    });

export const resetPasswordSchema = (t: Translations) =>
  z
    .object({
      newPassword: passwordFieldSchema(t),
      confirmPassword: z.string().nonempty(t("confirm-password-is-required")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords-do-not-match"),
      path: ["confirmPassword"],
    });



export const registerSchema = (t: Translations) =>
  accountInfoSchema(t).merge(createPasswordSchema(t));



