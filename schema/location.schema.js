import { z } from 'zod';

export const trekSessionSchema = z.object({
    startedAt: z.date().optional(),
    endedAt: z.date().optional()
}).refine((data) => data.startedAt !== undefined || data.endedAt !== undefined, {
    error: 'Either startedAt or endedAt is required'
})