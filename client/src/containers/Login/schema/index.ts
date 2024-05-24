import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({
    message: "Email can not be empty!",
  }),
  password: z.string({
    message: "Password can not be empty!",
  }),
});

export const registerSchema = z.object({
  email: z.string({
    message: "Email can not be empty!",
  }),
  name: z.string({
    message: "Name can not be empty!",
  }),
  phoneNumber: z.string({
    message: "Phone number can not be empty!",
  }),
  password: z.string({
    message: "Password can not be empty!",
  }),
});
