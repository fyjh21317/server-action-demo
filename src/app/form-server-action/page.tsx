'use client';

import { useActionState } from 'react';
import { submitForm } from './submit-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { ActorFormData } from '@/lib/schema';

type SubmissionError = Partial<Record<keyof ActorFormData, string[]>>;
type SubmissionState = { success: true } | { error: SubmissionError };

export default function ServerActionForm() {
  const initialState: SubmissionState = { error: {} };
  const [state, formAction] = useActionState<SubmissionState, FormData>(submitForm, initialState);

  const getError = (field: keyof ActorFormData): string | null => {
    return 'error' in state && state.error?.[field]?.[0] ? state.error[field]![0] : null;
  };

  const isSuccess = 'success' in state;

  return (
    <form action={formAction} className="max-w-md space-y-6 p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input name="name" id="name" />
        {getError('name') && <p className="text-sm text-red-500">{getError('name')}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="favoriteActor">Favorite Actor</Label>
        <Input name="favoriteActor" id="favoriteActor" />
        {getError('favoriteActor') && (
          <p className="text-sm text-red-500">{getError('favoriteActor')}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Why do you like this actor?</Label>
        <Input name="reason" id="reason" />
        {getError('reason') && <p className="text-sm text-red-500">{getError('reason')}</p>}
      </div>
      <Button type="submit">Submit</Button>
      {isSuccess && <p className="text-green-600">Submitted successfully!</p>}
    </form>
  );
}
