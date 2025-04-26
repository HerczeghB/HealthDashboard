import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

const FILE_PATH = path.resolve('src/data/metrics.json');
const DEFAULT_METRICS = {
    weight: [],
    steps: [],
    water: [],
    sleep: [],
    mood: []
};
const ALLOWED_MOODS = ['happy', 'neutral', 'sad', 'anxious', 'excited'];

export async function GET() {
    try {
        await fs.access(FILE_PATH);
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return json(JSON.parse(data));
    } catch (err) {
        await fs.writeFile(FILE_PATH, JSON.stringify(DEFAULT_METRICS, null, 2));
        return json(DEFAULT_METRICS, { status: 200 });
    }
}

export async function POST({ request }) {
    try {
        const { metric, data } = await request.json();

        if (!metric || !data?.date) {
            return json({ error: 'Invalid input format or missing date' }, { status: 400 });
        }

        // Date validation
        const submittedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (submittedDate < today) {
            return json({ error: 'Date cannot be in the past' }, { status: 400 });
        }

        // Metric-specific validation
        if (metric === 'mood') {
            // Mood should be a valid string
            if (!data.value || !ALLOWED_MOODS.includes(data.value)) {
                return json({ error: 'Mood must be a valid string' }, { status: 400 });
            }
        } else {
            // Other metrics should be a number greater than 0
            if (typeof data.value !== 'number' || data.value <= 0) {
                return json({ error: `Please enter a valid positive ${metric} value.` }, { status: 400 });
            }
        }

        // Read existing data from file
        let currentData;
        try {
            const raw = await fs.readFile(FILE_PATH, 'utf8');
            currentData = JSON.parse(raw);
        } catch {
            currentData = { ...DEFAULT_METRICS };
        }

        // Ensure metric exists
        if (!currentData[metric]) {
            return json({ error: 'Unknown metric type' }, { status: 400 });
        }

        // Check for existing data for the given date
        const existingIndex = currentData[metric].findIndex((entry: { date: any; }) => entry.date === data.date);
        if (existingIndex !== -1) {
            currentData[metric][existingIndex] = data; // Update existing entry
        } else {
            currentData[metric].push(data); // Add new entry
        }

        type MetricEntry = {
            date: string;
            value: number | string;
        };

        currentData[metric].sort((a: MetricEntry, b: MetricEntry) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        // Save updated data
        await fs.writeFile(FILE_PATH, JSON.stringify(currentData, null, 2));

        return json({ success: true });
    } catch (err) {
        console.error('Failed to add metric data:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

