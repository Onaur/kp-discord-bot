import { z } from "zod/v4";

export const HealthCheckResponseSchema = z.object({
  status: z.string(),
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
