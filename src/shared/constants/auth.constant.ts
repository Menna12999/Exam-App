export const CREATE_ACCOUNT_STEPS = {
    EMAIL: "email",
    OTP: "otp",
    ACCOUNT_INFO: "account-info",
    CREATE_PASSWORD: "create-password"
} as const;

export const OTP_COOLDOWN_TIME = 60000;

export const FORGOT_PASSWORD_STEPS = {
  EMAIL: "email",
  RESET_SENT: "reset-sent",
  RESET_PASSWORD: "reset-password",
} as const;



