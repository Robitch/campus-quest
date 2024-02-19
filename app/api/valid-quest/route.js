import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const qrCodeValue = searchParams.get('qrCodeValue');

    console.log('qrCodeValue', qrCodeValue);

    const client = await db.connect();

    try {
        // Recherchez la quête correspondant au qrCodeValue
        const quest = await client.query(`SELECT * FROM quetes WHERE qr_code = '${qrCodeValue}';`);
        console.log('quest', quest.rows);

        // Vérifiez s'il y a une quête correspondante
        if (quest.rows.length > 0) {
            await client.query(`UPDATE quetes SET terminee = true WHERE qr_code = '${qrCodeValue}';`);
            console.log('Quête marquée comme terminée avec succès.');
        } else {
            console.log('Aucune quête correspondante trouvée pour le QR code donné.');
        }

        // Retournez les données de la quête (peut être vide si aucune quête correspondante n'est trouvée)
        return NextResponse.json({ data: quest.rows });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la quête:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        // Assurez-vous de libérer la connexion client à la base de données
        client.release();
    }
}
