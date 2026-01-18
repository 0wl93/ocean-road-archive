import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export const dynamic = 'force-dynamic';

interface AirtableRecord {
  id: string;
  fields: {
    Title: string;
    URL: string;
    Category: string;
    Source: string;
    Date: string;
  };
}

interface Post {
  id: string;
  title: string;
  url: string;
  category: string;
  source: string;
  date: string;
}

export async function GET() {
  try {
    // Check for required environment variables
    const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID;

    if (!accessToken || !baseId || !tableId) {
      console.error('Missing Airtable credentials');
      return NextResponse.json(
        {
          error: 'Airtable not configured. Please set up environment variables.',
          posts: []
        },
        { status: 200 }
      );
    }

    // Configure Airtable
    const base = new Airtable({ apiKey: accessToken }).base(baseId);

    // Fetch records
    const records = await base(tableId)
      .select({
        sort: [{ field: 'Date', direction: 'desc' }],
      })
      .all();

    // Transform records to match our Post interface
    const posts: Post[] = records
      .filter((record: AirtableRecord) => {
        // Only include records that have required fields
        return record.fields.Title && record.fields.URL;
      })
      .map((record: AirtableRecord) => ({
        id: record.id,
        title: record.fields.Title || '',
        url: record.fields.URL || '',
        category: record.fields.Category || 'All',
        source: record.fields.Source || 'Unknown',
        date: record.fields.Date || new Date().toISOString().split('T')[0],
      }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch posts from Airtable',
        posts: []
      },
      { status: 200 }
    );
  }
}
