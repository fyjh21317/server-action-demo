'use server';

import { handleActorSubmission } from '@/lib/actions/submit-actor';
import { type ActorFormData } from '@/lib/schema';

type SubmissionError = Partial<Record<keyof ActorFormData, string[]>>;
type SubmissionState = { success: true } | { error: SubmissionError };

export async function submitForm(_: unknown, formData: FormData): Promise<SubmissionState> {
  const input: ActorFormData = {
    name: formData.get('name') as string,
    favoriteActor: formData.get('favoriteActor') as string,
    reason: formData.get('reason') as string,
  };

  const result = await handleActorSubmission(input);

  if (result.success) {
    return { success: true };
  }

  return {
    error: result.error ?? {},
  };
}
