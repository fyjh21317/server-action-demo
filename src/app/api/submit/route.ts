import { handleActorSubmission } from '@/lib/actions/submit-actor';
import { NextResponse } from 'next/server';
import { type ActorFormData } from '@/lib/schema';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await handleActorSubmission(body as ActorFormData);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
