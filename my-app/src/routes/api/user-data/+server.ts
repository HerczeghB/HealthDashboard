import fs from 'fs/promises';
import { json } from '@sveltejs/kit';
import path from 'path';

const FILE_PATH = path.resolve('src/data/user.json');

export async function GET() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return json(JSON.parse(data), { status: 200 });
    } catch (err) {
        // If file doesn't exist, return empty/default
        return json({ profile: {}, healthGoals: {}, dashboardPreferences: {} }, { status: 200 });
    }
}

export async function POST({ request }) {
    try {
        const body = await request.json();
        const { profile, healthGoals, dashboardPreferences } = body;

        const userData = {
            profile,
            healthGoals,
            dashboardPreferences
        };

        await fs.writeFile(FILE_PATH, JSON.stringify(userData, null, 2));
        return json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('Error saving user data:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
