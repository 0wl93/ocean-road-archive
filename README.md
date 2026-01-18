# Ocean Road Archive - Replica

An exact functional replica of the Ocean Road Archive inspiration collection website.

## Features

- **Header** with Ocean Road branding and post counter
- **Collapsible Filter Sidebar** with category filters
- **Category Filtering**: All, Technology, Design, AI, Culture, Engineering
- **Sources Dropdown** for filtering by content source
- **Responsive Design** that works on desktop and mobile
- **Post Display** with cards showing title, category, source, and date
- **Airtable Integration** - Posts managed via your company Airtable account

## Getting Started

### Development Server

The server is currently running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.216:3000

To start the server again in the future:

```bash
cd ocean-road-archive
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## Airtable Setup

**IMPORTANT:** This site is connected to Airtable for managing posts. Follow these steps to set up:

### Quick Setup

1. **See detailed instructions**: Open `AIRTABLE_SETUP.md` for complete setup guide
2. **Create Airtable base** with fields: Title, URL, Category, Source, Date
3. **Get API credentials** from your company Airtable account
4. **Copy `.env.local.example` to `.env.local`** and fill in your credentials
5. **Restart dev server** to see posts from Airtable

### Adding Posts

Once Airtable is connected:

1. Open your Airtable base
2. Click **"+ Add record"**
3. Fill in: Title, URL, Category, Source, and Date
4. Posts appear on the website automatically!

## Customizing

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
  alt="Ocean Road Logo"
  width={32}
  height={32}
/>
```

## Project Structure

```
ocean-road-archive/
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
