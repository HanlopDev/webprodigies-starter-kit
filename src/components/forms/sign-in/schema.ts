import React from "react"
import { z } from "zod"

export const signInSchema = z.object({
    email: z.string().email("You must give a valid email"),
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
