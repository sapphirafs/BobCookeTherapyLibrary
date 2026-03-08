# Therapy Videos Project 

## Project Overview
A React/TypeScript + Vite web application showcasing psychotherapy content. Displays videos and podcasts from YouTube in a searchable, paginated interface with an admin panel. Data is fetched from YouTube channels/playlists via RSS feeds and stored as static TypeScript exports.

## Architecture

### Core Structure
- **Frontend**: React 19 + TypeScript + React Router for navigation
- **Build**: Vite for dev server and production builds
- **Data Flow**: External YouTube content → Node.js fetch scripts → `src/data/*.ts` files → React components
- **Styling**: CSS modules/inline styles with shared globals in `src/components/styles/globals.css`

### Key Data Files
- [src/data/videos.ts](src/data/videos.ts) - Large exported array (~4700 lines) of video objects fetched from YouTube channel
- [src/data/podcasts.ts](src/data/podcasts.ts) - Podcast array (~2100 lines) from YouTube playlist

All data objects follow shape: `{ id, title, description, url, category, type, source }`

### Component Architecture
- **Layout**: [Header](src/components/Header.tsx) → main routes → [Footer](src/components/Footer.tsx)
- **Routes**: `/` (VideoList) and `/podcasts` (Podcasts page)
- **Reusable Patterns**: [VideoList](src/components/VideoList.tsx) and [PodcastList](src/components/PodcastList.tsx) use identical patterns:
  - Local state: `page` (current), `query` (search text)
  - `useMemo` for filtered data based on title/description search
  - 12 items per page constant
  - Reset to page 1 when query changes
  - [Pagination](src/components/Pagination.tsx) component for navigation
  - [SearchBar](src/components/SearchBar.tsx) for filtering
  - Card components ([VideoCard](src/components/VideoCard.tsx), [PodcastCard](src/components/PodcastCard.tsx)) for rendering items

## Data Fetching & Updates

### Scripts (Node.js CommonJS)
Run with `npm run update:[type]`:
- **`services/fetchVideos.cjs`**: Uses `rss-parser` to fetch YouTube channel feed, maps items to data shape, writes to `src/data/videos.ts`
- **`services/fetchPodcasts.cjs`**: Uses YouTube API v3 + `node-fetch` to paginate playlist items, writes to `src/data/podcasts.ts`
- **`services/fetchAllPlaylists.cjs`**: Similar pattern for additional playlists

**Important**: Scripts use hardcoded YouTube channel ID and API key; they append TypeScript export wrappers around JSON output.

## Development Workflow

### Build & Run
- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - TypeScript check + Vite build to dist/
- `npm run lint` - ESLint check
- `npm run preview` - Preview production build locally
- `npm run update:videos|podcasts|playlists` - Refresh data from YouTube

### Key Conventions
1. **Type Safety**: All components are typed as `React.FC<Props>` where applicable
2. **No State Management**: Uses local React state; no Redux/Zustand
3. **Data is Static**: Generated once via scripts, not fetched client-side; no API layer
4. **CSS Organization**: Component styles inline or in `src/components/styles/globals.css`
5. **Search**: Case-insensitive substring match on title (videos) or title+description (podcasts)
6. **Pagination**: Always hardcoded 12 items/page; resettable on query change

## Admin Section
- [AdminPage.tsx](src/components/pages/AdminPage.tsx) protected by password in [config/adminPassword.ts](src/config/adminPassword.ts)
- Purpose: Manage content (exact features TBD by file content)

## Common Tasks

**Adding a new content type** (e.g., courses):
1. Create fetch script in `services/fetchCourses.cjs` following existing RSS/API pattern
2. Add `npm run update:courses` to package.json scripts
3. Export static array from `src/data/courses.ts`
4. Create [CourseList.tsx](src/components/CourseList.tsx) and [CourseCard.tsx](src/components/CourseCard.tsx) reusing Pagination/SearchBar patterns
5. Add route in [App.tsx](src/App.tsx) and nav link in [Header.tsx](src/components/Header.tsx)

**Modifying search behavior**: Update filter logic in VideoList/PodcastList `useMemo` blocks (currently only title for videos, title+description for podcasts).

**Updating YouTube sources**: Modify channel ID or playlist ID in corresponding fetch script, then run `npm run update:[type]`.

## Dependencies
- **React/React Router**: UI framework and routing
- **Vite**: Build tool
- **rss-parser**: Parse YouTube RSS feeds
- **node-fetch v2**: HTTP requests in Node scripts
- **TypeScript**: Type checking
- **ESLint**: Linting

## Notes
- No database; all content is versioned static TypeScript
- Data scripts must be run manually to sync YouTube changes
- Large data files (videos.ts, podcasts.ts) contain raw JSON arrays—avoid manual edits
