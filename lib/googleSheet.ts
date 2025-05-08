import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  keyFile: 'credentials.json',
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getSheetData(range: string) {
  const client = await auth.getClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });
  return res.data.values || [];
}

export async function getAllData() {
  const [characters, events, episodes, settings] = await Promise.all([
    getSheetData(process.env.CHARACTER_RANGE!),
    getSheetData(process.env.EVENT_RANGE!),
    getSheetData(process.env.EPISODE_RANGE!),
    getSheetData(process.env.SETTING_RANGE!),
  ]);

  return { characters, events, episodes, settings };
}
