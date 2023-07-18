import { createClient } from '@vercel/edge-config';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const edgeCleint = createClient(process.env.COMMERCEJS_CONFIG ?? '');

export async function GET(): Promise<Response> {
  try {
    const menu = await edgeCleint.get('menu');

    return NextResponse.json(menu);
  } catch (e) {
    if (!(e instanceof Error)) throw e;

    console.error(e.message);
    return new Response(`Failed to retrieve menu`, {
      status: 500,
    });
  }
}
