'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ApiForm() {
  const [error, setError] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError({});
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        favoriteActor: formData.get('favoriteActor'),
        reason: formData.get('reason'),
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      setError(json.error || {});
    } else {
      setSuccess(true);
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-6 p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input name="name" id="name" />
        {error?.name && <p className="text-sm text-red-500">{error.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="favoriteActor">Favorite Actor</Label>
        <Input name="favoriteActor" id="favoriteActor" />
        {error?.favoriteActor && <p className="text-sm text-red-500">{error.favoriteActor[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Why do you like this actor?</Label>
        <Input name="reason" id="reason" />
        {error?.reason && <p className="text-sm text-red-500">{error.reason[0]}</p>}
      </div>
      <Button type="submit">Submit</Button>
      {success && <p className="text-green-600">Submitted successfully!</p>}
    </form>
  );
}
