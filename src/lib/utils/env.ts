import { z } from 'zod';

const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const clientEnvSchema = z.object({
    API_URL: z.string().trim().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
});

export type ServerEnvironmentVariables = z.infer<typeof serverEnvSchema>;

export type ClientEnvironmentVariables = z.infer<typeof clientEnvSchema>;

const serverEnvParseResult = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
});

let serverEnv: ServerEnvironmentVariables = {} as ServerEnvironmentVariables;

if (!serverEnvParseResult.success) {
    console.warn(serverEnvParseResult.error.format());
} else {
    serverEnv = serverEnvParseResult.data;
}

export { serverEnv };

export const clientEnv: ClientEnvironmentVariables = clientEnvSchema.parse({
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
});

export const isProduction = serverEnv.NODE_ENV === 'production';

export const isDevelopment = serverEnv.NODE_ENV === 'development';
