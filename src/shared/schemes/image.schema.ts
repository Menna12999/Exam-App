import z from "zod";

export const imageSchema = z.object({
    image: z.file().min(1).max(1024 * 1024).mime(["image/jpeg", "image/png"]),
}).strict();
