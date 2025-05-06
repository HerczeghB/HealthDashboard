import fs from 'fs/promises';
import { json } from '@sveltejs/kit';
import path from 'path';

const DATA_DIR = path.resolve('src/data');
const FILE_PATH = path.join(DATA_DIR, 'user.json');
const DEFAULT_DATA = {
    profile: {
        name: "",
        email: "",
        birthdate: new Date().toISOString().split('T')[0],
        gender: ""

    },
    healthGoals: {},
    dashboardPreferences: {
        showWeight: true,
        showSteps: true,
        showSleep: true,
        showWater: true,
        showActivity: true,
        showNutrition: true,
        showMood: true,
        showEvents: true
    }
}

export async function GET() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return json(JSON.parse(data), { status: 200 });
    } catch (err) {
        // If file doesn't exist, return default
        return json(DEFAULT_DATA, { status: 200 });
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

        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(FILE_PATH, JSON.stringify(userData, null, 2));
        return json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('Error saving user data:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}