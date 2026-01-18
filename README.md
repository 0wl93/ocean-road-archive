# Little Plains Archive - Replica

An exact functional replica of the Little Plains Archive inspiration collection website.

## Features

- **Header** with Little Plains branding and post counter
- **Collapsible Filter Sidebar** with category filters
- **Category Filtering**: All, Technology, Design, AI, Culture, Engineering
- **Sources Dropdown** for filtering by content source
- **Responsive Design** that works on desktop and mobile
- **Post Display** with cards showing title, category, source, and date

## Getting Started

### Development Server

The server is currently running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.216:3000

To start the server again in the future:

```bash
cd littleplains-archive
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## Customizing the Data

### Adding Posts

Edit the `posts` array in `/app/archive/page.tsx` (around line 20):

```typescript
const posts: Post[] = [
  {
    id: 1,
    title: 'Your Post Title',
    url: 'https://example.com',
    category: 'Technology', // Must be one of: Technology, Design, AI, Culture, Engineering
    source: 'Source Name',
    date: '2024-01-15' // YYYY-MM-DD format
  },
  // Add more posts here...
];
```

### Connecting to a Backend/Database

To use real data instead of the sample posts:

1. **Replace the hardcoded posts array** with data fetching:

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function Archive() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your API
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Rest of your component...
}
```

2. **Create an API route** at `/app/api/posts/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch from your database
  const posts = await yourDatabase.posts.findMany();
  return NextResponse.json(posts);
}
```

### Changing Categories

Edit the `categories` array in `/app/archive/page.tsx` (around line 37):

```typescript
const categories: FilterCategory[] = [
  'All',
  'Technology',
  'Design',
  'AI',
  'Culture',
  'Engineering',
  // Add new categories here
];
```

Don't forget to update the `FilterCategory` type definition as well (around line 5).

### Customizing Styles

The project uses Tailwind CSS. Key styling files:
- `/app/globals.css` - Global styles and theme colors
- `/app/archive/page.tsx` - Component-specific Tailwind classes

To change the color scheme, edit the classes in the components:
- Primary brand color (currently black): `bg-gray-900`, `text-gray-900`
- Borders: `border-gray-200`
- Hover states: `hover:bg-gray-200`, `hover:border-gray-300`

### Adding Logo Images

Replace the placeholder logo by:

1. Add your logo image to `/public/logo.png`
2. Update the header in `/app/archive/page.tsx`:

```typescript
<Image
  src="/logo.png"
  alt="Little Plains Logo"
  width={32}
  height={32}
/>
```

## Project Structure

```
littleplains-archive/
├── app/
│   ├── archive/
│   │   └── page.tsx          # Main archive page with filters and posts
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Home page (redirects to /archive)
├── public/                   # Static assets (images, etc.)
└── package.json
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React** - UI components

## Key Components

### Filter Sidebar
- Collapsible filters panel
- Category chips with active state
- Source dropdown (expandable)
- Post count display

### Post Cards
- Clickable title linking to external URL
- Category badge
- Source and date metadata
- Hover effects

### Responsive Behavior
- Mobile: Stacked layout with full-width filters
- Desktop: Side-by-side with sticky filter sidebar
- Breakpoint: `lg` (1024px)

## Next Steps

1. **Add Real Data**: Connect to your backend or CMS
2. **Implement Sources Filter**: Add source filtering logic
3. **Add Search**: Implement text search functionality
4. **Add Pagination**: Load more posts as needed
5. **Add Sorting**: Sort by date, title, or relevance
6. **Add Loading States**: Show skeleton loaders while fetching data

## Support

For Next.js documentation, visit: https://nextjs.org/docs
For Tailwind CSS docs, visit: https://tailwindcss.com/docs
