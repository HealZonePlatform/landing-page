import { google, sheets_v4 } from 'googleapis';
import { promises as fs } from 'fs';
import path from 'path';

type GoogleServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  project_id?: string;
  [key: string]: unknown;
};

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

let sheetsClientPromise: Promise<sheets_v4.Sheets> | null = null;

const stripQuotes = (value: string) => value.replace(/^['"]|['"]$/g, '');

const normalizeSpreadsheetId = (rawId: string): string => {
  let candidate = stripQuotes(rawId.trim());

  // Full URL pattern: https://docs.google.com/spreadsheets/d/<ID>/edit#gid=...
  const urlIdMatch = candidate.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (urlIdMatch?.[1]) {
    return urlIdMatch[1];
  }

  // Remove query params or trailing path fragments
  candidate = candidate.split('?')[0] || candidate;
  candidate = candidate.split('#')[0] || candidate;
  candidate = candidate.replace(/\/edit$/, '');

  if (candidate.includes('/')) {
    const parts = candidate.split('/');
    candidate = parts[parts.length - 1] || candidate;
  }

  return candidate;
};

const normalizeRange = (rawRange: string): string => {
  let range = stripQuotes(rawRange.trim());
  if (!range.includes('!')) {
    const sheetName = range || 'Sheet1';
    range = `${sheetName}!A:D`;
  }
  return range;
};

const resolveCredentialFile = async (): Promise<string | null> => {
  const customPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (customPath) {
    const resolved = path.isAbsolute(customPath)
      ? customPath
      : path.join(process.cwd(), customPath);
    try {
      await fs.access(resolved);
      return resolved;
    } catch {
      // fall through to other options
    }
  }

  const candidates = [
    path.join(process.cwd(), 'Credentials.json'),
    path.join(process.cwd(), 'credentials.json'),
    path.join(process.cwd(), 'LANDING-PAGE', 'Credentials.json'),
    path.join(process.cwd(), 'LANDING-PAGE', 'credentials.json'),
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next candidate
    }
  }

  return null;
};

const loadCredentials = async (): Promise<GoogleServiceAccountCredentials> => {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    const parsed = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) as GoogleServiceAccountCredentials;
    return {
      ...parsed,
      private_key: parsed.private_key?.replace(/\\n/g, '\n') ?? '',
    };
  }

  const credentialsFile = await resolveCredentialFile();
  if (!credentialsFile) {
    throw new Error(
      'Không tìm thấy Credentials.json. Hãy đặt file vào thư mục gốc dự án hoặc cấu hình GOOGLE_APPLICATION_CREDENTIALS/GOOGLE_APPLICATION_CREDENTIALS_JSON.',
    );
  }

  const raw = await fs.readFile(credentialsFile, 'utf-8');
  const parsed = JSON.parse(raw) as GoogleServiceAccountCredentials;
  if (!parsed.private_key || !parsed.client_email) {
    throw new Error('File Credentials.json thiếu private_key hoặc client_email.');
  }

  return {
    ...parsed,
    private_key: parsed.private_key.replace(/\\n/g, '\n'),
  };
};

const getSheetsClient = async (): Promise<sheets_v4.Sheets> => {
  if (!sheetsClientPromise) {
    sheetsClientPromise = (async () => {
      const credentials = await loadCredentials();
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
      });

      return google.sheets({
        version: 'v4',
        auth,
      });
    })();
  }

  return sheetsClientPromise;
};

export const appendRow = async (options: {
  sheetId: string;
  range: string;
  values: Array<string | number | boolean | null>;
}): Promise<void> => {
  const sheets = await getSheetsClient();
  const spreadsheetId = normalizeSpreadsheetId(options.sheetId);
  const range = normalizeRange(options.range);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [options.values],
    },
  });
};
