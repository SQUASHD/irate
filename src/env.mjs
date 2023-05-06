import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        DATABASE_SERVICE_ROLE: z.string(),
        JWT_SECRET: z.string(),
    },
    client: {
        NEXT_PUBLIC_SUPABASE_API_KEY: z.string(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
        DATABASE_SERVICE_ROLE: process.env.DABATASE_SERVICE_ROLE,
        JWT_SECRET: process.env.JWT_SECRET,
    },
});
