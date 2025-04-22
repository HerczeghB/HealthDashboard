import fs from 'fs/promises';
import path from 'path';

const FILE_PATH = 'src/data/dashboard-preferences.json';
const DEFAULT_PREFERENCES = {
    showWeight: true,
    showSteps: true,
    showSleep: true,
    showWater: true,
    showActivity: true,
    showNutrition: true,
    showMood: true,
    showEvents: true,
};

export async function GET(){
    try{
        await fs.access(FILE_PATH);
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return new Response(data, {
            headers: {'Content-Type': 'application/json'}
        });
    }catch(err){
        await fs.writeFile(FILE_PATH, JSON.stringify(DEFAULT_PREFERENCES, null, 2));
        return new Response(JSON.stringify(DEFAULT_PREFERENCES),  {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    }
}

export async function POST({ request }){
    try{
        const prefs = await request.json();
        await fs.writeFile(FILE_PATH, JSON.stringify(prefs, null, 2));
        return new Response(JSON.stringify({success: true}), {status: 200});
    }catch(err){
        return new Response(JSON.stringify({error: 'Could not save preferences'}), {status: 500})
    }
}


