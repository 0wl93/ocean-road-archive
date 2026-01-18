# Airtable Setup Instructions

Follow these steps to connect your Ocean Road Archive to your company Airtable account.

## Step 1: Create the Airtable Base

1. **Log into your company Airtable account**: https://airtable.com
2. **Create a new base**:
   - Click "Add a base" or "Create a base"
   - Choose "Start from scratch"
   - Name it: **"Ocean Road Archive"**

## Step 2: Set Up the Table Structure

Rename the default table to **"Posts"** and create these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Title | Single line text | - |
| URL | URL | - |
| Category | Single select | Options: Technology, Design, AI, Culture, Engineering |
| Source | Single line text | - |
| Date | Date | Format: Local (MM/DD/YYYY) |

### To add fields:
1. Click the **"+"** button next to the last column
2. Choose the field type
3. Name the field
4. For **Category**, add all 5 options as single select choices

## Step 3: Add Sample Data (Optional)

Add a few test posts to verify everything works:

| Title | URL | Category | Source | Date |
|-------|-----|----------|--------|------|
| Example Tech Article | https://example.com | Technology | Tech Blog | 01/15/2024 |
| Design Inspiration | https://example.com | Design | Design Weekly | 01/14/2024 |

## Step 4: Get Your API Credentials

### Get Personal Access Token:

1. Go to https://airtable.com/create/tokens
2. Click **"Create new token"**
3. Name it: **"Ocean Road Archive"**
4. Add these scopes:
   - `data.records:read`
   - `schema.bases:read`
5. Under "Access", click **"Add a base"** and select your "Ocean Road Archive" base
6. Click **"Create token"**
7. **COPY THE TOKEN** - you won't see it again!

### Get Base ID:

1. Go to https://airtable.com/api
2. Click on your **"Ocean Road Archive"** base
3. In the URL, you'll see something like: `https://airtable.com/appXXXXXXXXXXXXXX/api/docs`
4. Copy the part that starts with `app` (e.g., `appXXXXXXXXXXXXXX`)
5. This is your **BASE_ID**

### Get Table ID:

1. Open your "Ocean Road Archive" base
2. Click on the "Posts" table
3. In the URL, look for a part like: `tblXXXXXXXXXXXXXX`
4. Copy this - it's your **TABLE_ID**

## Step 5: Configure Environment Variables

Create a file called `.env.local` in your project root with:

```
AIRTABLE_ACCESS_TOKEN=your_token_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_ID=tblXXXXXXXXXXXXXX
```

Replace with your actual values from Step 4.

## Step 6: Deploy to Vercel

When deploying to Vercel, add these environment variables:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add all three variables:
   - `AIRTABLE_ACCESS_TOKEN`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_ID`
4. Redeploy your project

## Managing Posts

### To Add a New Link:

1. Open your Airtable base
2. Click **"+ Add record"** or the **"+"** at the bottom
3. Fill in:
   - Title: Name of the article/link
   - URL: Full URL (https://...)
   - Category: Choose from dropdown
   - Source: Where it came from
   - Date: When it was added

### To Edit/Delete:

- Click any cell to edit
- Right-click a row → Delete to remove

### Team Access:

1. Click **"Share"** in the top-right of your base
2. Invite team members by email
3. Set permissions (Editor, Commenter, or Read-only)

## Troubleshooting

**Posts not showing?**
- Check that your .env.local file exists and has correct values
- Verify the Personal Access Token has the right scopes
- Make sure the table name is exactly "Posts"

**Permission errors?**
- Ensure your token has access to the specific base
- Check that scopes include `data.records:read`

**Updates not appearing?**
- The site fetches fresh data on each page load
- Try a hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
