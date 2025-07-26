'use server';

import { actorFormSchema, type ActorFormData } from '@/lib/schema';
import { prisma } from '@/lib/prisma';
import { treeifyError } from 'zod';

interface SubmitActorResult {
  success?: true;
  error?: Partial<Record<keyof ActorFormData, string[]>>;
}

export async function handleActorSubmission(input: ActorFormData): Promise<SubmitActorResult> {
  const result = actorFormSchema.safeParse(input);

  if (!result.success) {
    const tree = treeifyError(result.error);
    return {
      error: {
        name: tree.properties?.name?.errors ?? [],
        favoriteActor: tree.properties?.favoriteActor?.errors ?? [],
        reason: tree.properties?.reason?.errors ?? [],
      },
    };
  }

  await prisma.actorSubmission.create({ data: result.data });
  return { success: true };
}
