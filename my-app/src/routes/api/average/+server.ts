import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

const FILE_PATH = path.resolve('src/data/metrics.json');

const calculateAverage = (data: {date: string; value: number}[]): number => {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    return Math.round((total / data.length) * 10) / 10;
};

export async function GET(){
    try{
        const content = await fs.readFile(FILE_PATH, 'utf8');
        const data = JSON.parse(content);
        return json({
            weight: calculateAverage(data.weight),
            steps: calculateAverage(data.steps),
            water: calculateAverage(data.water),
            sleep: calculateAverage(data.sleep)
        });

    }catch(err){
        console.error("Error reading/processing the file",err);
        return json({ error: "Unable to calculate averages." }, { status: 500 });
    }

}