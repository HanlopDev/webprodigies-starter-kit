import { z } from "zod"

export const CreateGroupSchema = z.object({
    name: z.string().min(3, { message: "Group should be atleats 3 character" }),
    category: z.string().min(3, { message: "You must select a category" }),
})
