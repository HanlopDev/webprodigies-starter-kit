import { z } from "zod"

export const SignUpSchema = z.object({
    firstname: z
        .string()
        .min(3, { message: "Firstname must be atleast 3 chharacter" }),
    lastname: z
        .string()
        .min(3, { message: "Lastname must be atleast 3 chharacter" }),
    email: z.string().email("You must give valid email"),
    password: z
        .string()
        .min(8, { message: "your password must be at least 8 charecter long" })
        .max(64, {
            message: "your password can not be longer than 64 characters  long",
        })
        .refine(
            (value) => /^[A-zA-Z0-9_.-]*$/.test(value ?? ""),
            "password should contain only alphabets and  number",
        ),
})
