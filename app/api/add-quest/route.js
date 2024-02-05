import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const questName = searchParams.get('questName');
    const questDescription = searchParams.get('questDescription');

    try {
        if (!questName || !questDescription) throw new Error('Quest and questDescription names required');
        await sql`INSERT INTO Quests (Name, Description) VALUES (${questName}, ${questDescription});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const quests = await sql`SELECT * FROM Quests;`;
    return NextResponse.json({ quests }, { status: 200 });
}