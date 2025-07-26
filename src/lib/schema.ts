import { z } from 'zod/v4';

export const actorFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  favoriteActor: z.string().min(1, 'Favorite actor is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export type ActorFormData = z.infer<typeof actorFormSchema>;
