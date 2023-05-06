import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        SHADOW_DATABASE_URL: z.string().url(),
        JWT_SECRET: z.string(),
    },
    client: {
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
    },
});
