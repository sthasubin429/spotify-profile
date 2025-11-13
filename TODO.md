# Spotify Profile Development Roadmap

## Quick Summary (Minimal Implementation)
The minimal viable product includes:
- 6 new pages displaying user's Spotify data
- Sidebar navigation for easy access
- Basic profile, top artists/tracks, playlists, and recently played pages
- Time range filters on artists and tracks
- Playlist details with track listings

---

## Phase 1: Foundation & Setup

### 1.1 Install React Query (TanStack Query)
**Description**: Add React Query library for efficient data fetching, caching, and state management instead of manual axios + useState.

**Tasks**:
- [x] Install `@tanstack/react-query` package
- [x] Install `@tanstack/react-query-devtools` for development debugging
- [x] Configure QueryClient in `_app.tsx`
- [x] Wrap app with QueryClientProvider
- [x] Import and configure devtools in development

**Estimated Time**: 30 minutes

**Why**: React Query handles loading/error states automatically, caches data, manages refetching, and reduces boilerplate code compared to manual state management.

---

### 1.2 Create Spotify API Client Utility
**File**: `utils/spotifyApi.ts`

**Description**: Create a centralized client for all Spotify Web API calls with automatic token injection, error handling, and reusable functions.

**Tasks**:
- [x] Create axios instance with base URL `https://api.spotify.com/v1`
- [x] Add interceptor to inject access token from cookies
- [x] Add interceptor to handle 401 errors (token refresh)
- [x] Export function: `getMe()` - Get current user profile
- [x] Export function: `getTopArtists(timeRange, limit)` - Top artists
- [x] Export function: `getTopTracks(timeRange, limit)` - Top tracks
- [x] Export function: `getMyPlaylists(limit)` - User's playlists
- [x] Export function: `getPlaylistTracks(playlistId)` - Tracks in playlist
- [x] Export function: `getRecentlyPlayed(limit)` - Recently played tracks
- [x] Export function: `getAudioFeatures(trackIds[])` - Audio features for tracks
- [x] Export function: `getRecommendations(params)` - Get recommendations
- [x] Export function: `getPlaylist(playlistId)` - Get single playlist details
- [x] Add error handling with user-friendly messages

**Estimated Time**: 1.5 hours

**API Reference**:
- GET `/me` - Current user profile
- GET `/me/top/artists` - Top artists (short_term, medium_term, long_term)
- GET `/me/top/tracks` - Top tracks
- GET `/me/playlists` - User's playlists
- GET `/playlists/{id}/tracks` - Playlist tracks
- GET `/me/player/recently_played` - Recently played
- GET `/audio-features` - Audio features for tracks
- GET `/recommendations` - Get recommendations

---

### 1.3 Add TypeScript Interfaces
**File**: `shared/interface.ts`

**Description**: Define all TypeScript interfaces for Spotify API responses.

**Tasks**:
- [x] Create `SpotifyUser` interface (id, display_name, external_urls, followers, images, uri, etc.)
- [x] Create `SpotifyArtist` interface (id, name, genres, images, followers, popularity, etc.)
- [x] Create `SpotifyTrack` interface (id, name, artists[], album, duration_ms, popularity, explicit, etc.)
- [x] Create `SpotifyPlaylist` interface (id, name, owner, tracks, images, description, public, etc.)
- [x] Create `SpotifyAlbum` interface (id, name, artists[], release_date, images, total_tracks, etc.)
- [x] Create `SpotifyRecentlyPlayed` interface (track, context, played_at)
- [x] Create `SpotifyAudioFeatures` interface (energy, danceability, acousticness, etc.)
- [x] Create `SpotifyRecommendations` interface (tracks[], seeds[])
- [x] Create `TimeRange` enum (short_term, medium_term, long_term)
- [x] Create `PaginatedResponse<T>` generic interface

**Estimated Time**: 45 minutes

---

### 1.4 Add Constants
**File**: `utils/constant.ts` (update existing)

**Description**: Add Spotify API related constants.

**Tasks**:
- [x] Add `SPOTIFY_API_URL = 'https://api.spotify.com/v1'`
- [x] Add `TIME_RANGE_OPTIONS` object with labels and values
- [x] Add default API limits (e.g., `DEFAULT_LIMIT_ARTISTS = 50`)
- [x] Add time range enums

**Estimated Time**: 15 minutes

---

## Phase 2: UI Components & Layout

### 2.1 Create Sidebar Navigation Component
**File**: `components/Sidebar.tsx`

**Description**: Fixed sidebar navigation that appears on all authenticated pages with links to all 6 new pages.

**Tasks**:
- [ ] Create Sidebar component with fixed positioning
- [ ] Add navigation links: Profile, Top Artists, Top Tracks, Playlists, Recently Played, Wrapped
- [ ] Add active link highlighting
- [ ] Add Spotify logo/branding at top
- [ ] Add responsive design (collapse on mobile)
- [ ] Style with Tailwind CSS using Spotify color scheme
- [ ] Test navigation on all pages

**Estimated Time**: 45 minutes

**Styling**: Use Spotify's color scheme (dark background, green accents)

---

### 2.2 Create Reusable Card Components

#### 2.2.1 ArtistCard Component
**File**: `components/ArtistCard.tsx`

**Tasks**:
- [ ] Display artist image (circular or rounded)
- [ ] Display artist name
- [ ] Display genres (comma-separated)
- [ ] Make clickable (optional: link to Spotify or details page)
- [ ] Style with hover effects
- [ ] Handle missing image gracefully

---

#### 2.2.2 TrackCard Component
**File**: `components/TrackCard.tsx`

**Tasks**:
- [ ] Display album art thumbnail
- [ ] Display track name
- [ ] Display artist(s) name
- [ ] Display album name (optional)
- [ ] Display duration in MM:SS format
- [ ] Display explicit badge if applicable
- [ ] Make clickable (optional: link to Spotify or details page)
- [ ] Responsive layout (full width on mobile, row layout)

---

#### 2.2.3 PlaylistCard Component
**File**: `components/PlaylistCard.tsx`

**Tasks**:
- [ ] Display playlist cover image
- [ ] Display playlist name
- [ ] Display track count
- [ ] Display owner/creator info (optional)
- [ ] Make clickable to navigate to playlist details
- [ ] Style with hover effects

---

### 2.3 Create Other Utility Components

#### 2.3.1 TimeRangeSelector
**File**: `components/TimeRangeSelector.tsx`

**Tasks**:
- [ ] Create tab/button group component
- [ ] Options: All Time, Last 6 Months, Last Month, Last Year
- [ ] Handle value changes
- [ ] Highlight active selection
- [ ] Style with Tailwind

---

#### 2.3.2 Loader Component
**File**: `components/Loader.tsx`

**Tasks**:
- [ ] Create loading spinner
- [ ] Center on page
- [ ] Add "Loading..." text (optional)
- [ ] Accessible for screen readers

---

#### 2.3.3 ErrorMessage Component
**File**: `components/ErrorMessage.tsx`

**Tasks**:
- [ ] Display error message
- [ ] Add retry button
- [ ] Style as error alert
- [ ] Handle different error types gracefully

---

#### 2.3.4 StatCard Component
**File**: `components/StatCard.tsx`

**Tasks**:
- [ ] Display large stat number/text
- [ ] Display label below
- [ ] Optional icon or gradient background
- [ ] Used for wrapped page stats

---

### 2.4 Update Base Layout
**File**: `layouts/Base.tsx`

**Tasks**:
- [ ] Import Sidebar component
- [ ] Add Sidebar to layout when authenticated
- [ ] Adjust main content area to accommodate sidebar
- [ ] Keep minimal for login page (no sidebar)
- [ ] Test layout on various screen sizes

**Estimated Time**: 30 minutes

---

### 2.5 Update Main Component
**File**: `components/Main.tsx`

**Tasks**:
- [ ] After login, redirect to `/profile` page instead of showing "Logged"
- [ ] Remove the hardcoded "Logged" text
- [ ] Keep authentication logic intact

**Estimated Time**: 15 minutes

---

## Phase 3: Core Pages (Minimal Implementation)

### 3.1 Profile Page
**File**: `pages/profile.tsx`

**Description**: Display user's profile information including personal stats and top artists/tracks.

**Tasks**:
- [ ] Use `useQuery` to fetch user profile via `getMe()`
- [ ] Display user info:
  - [ ] Profile picture (circular image)
  - [ ] Username/Display name
  - [ ] Followers count (formatted with commas)
  - [ ] Following count
  - [ ] Subscription type (Spotify Premium/Free)
- [ ] Add logout button
- [ ] Fetch top 10 artists and top 10 tracks
- [ ] Display top 10 artists in grid with ArtistCard
- [ ] Display top 10 tracks in list with TrackCard
- [ ] Add loading state
- [ ] Add error handling
- [ ] Responsive grid layout

**Estimated Time**: 2 hours

**API Calls**:
- GET `/me`
- GET `/me/top/artists?limit=10`
- GET `/me/top/tracks?limit=10`

---

### 3.2 Top Artists Page
**File**: `pages/top-artists.tsx`

**Description**: Display user's top artists with time range filtering.

**Tasks**:
- [ ] Import TimeRangeSelector component
- [ ] Create state for selected time range
- [ ] Use `useQuery` to fetch top artists based on time range
- [ ] Display artists in grid layout with ArtistCard
- [ ] Handle loading state (skeleton cards or spinner)
- [ ] Handle error state
- [ ] Add pagination or "Load more" button for large lists
- [ ] Make time range selector sticky (stays visible while scrolling)
- [ ] Responsive grid layout (4-6 columns on desktop, 2-3 on mobile)

**Estimated Time**: 1.5 hours

**API Calls**:
- GET `/me/top/artists?time_range={short_term|medium_term|long_term}&limit=50`

---

### 3.3 Top Tracks Page
**File**: `pages/top-tracks.tsx`

**Description**: Display user's top tracks with time range filtering.

**Tasks**:
- [ ] Import TimeRangeSelector component
- [ ] Create state for selected time range
- [ ] Use `useQuery` to fetch top tracks based on time range
- [ ] Display tracks in list format with TrackCard
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Add pagination or "Load more" button
- [ ] Make time range selector sticky
- [ ] Full width responsive layout

**Estimated Time**: 1.5 hours

**API Calls**:
- GET `/me/top/tracks?time_range={short_term|medium_term|long_term}&limit=50`

---

### 3.4 Playlists Page
**File**: `pages/playlists.tsx`

**Description**: Display user's playlists in a grid.

**Tasks**:
- [ ] Use `useQuery` to fetch user's playlists
- [ ] Display playlists in grid with PlaylistCard component
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Add pagination (Spotify API returns paginated results)
- [ ] Make each playlist clickable to navigate to `/playlist/[id]`
- [ ] Responsive grid layout
- [ ] Show empty state if user has no playlists

**Estimated Time**: 1.5 hours

**API Calls**:
- GET `/me/playlists?limit=50`

---

### 3.5 Playlist Details Page
**File**: `pages/playlist/[id].tsx`

**Description**: Display details of a specific playlist and its tracks.

**Tasks**:
- [ ] Get playlist ID from router params
- [ ] Fetch playlist details via `getPlaylist(id)`
- [ ] Fetch playlist tracks via `getPlaylistTracks(id)`
- [ ] Display playlist info:
  - [ ] Cover image
  - [ ] Playlist name
  - [ ] Owner/creator name
  - [ ] Track count
  - [ ] Description (if available)
- [ ] Display playlist tracks in list with TrackCard
- [ ] Add "Generate Recommendations" button (link to recommendations page)
- [ ] Handle loading and error states
- [ ] Add back button to go back to playlists

**Estimated Time**: 1.5 hours

**API Calls**:
- GET `/playlists/{id}`
- GET `/playlists/{id}/tracks?limit=50`

---

### 3.6 Recently Played Page
**File**: `pages/recently-played.tsx`

**Description**: Display user's recently played tracks.

**Tasks**:
- [ ] Use `useQuery` to fetch recently played tracks
- [ ] Display in list format with TrackCard
- [ ] Show play timestamp (e.g., "Played 2 hours ago")
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Add pagination or "Load more" button
- [ ] Sort by most recent first (API default)
- [ ] Full width responsive layout

**Estimated Time**: 1 hour

**API Calls**:
- GET `/me/player/recently_played?limit=50`

---

### 3.7 Wrapped Page - Minimal
**File**: `pages/wrapped.tsx`

**Description**: Spotify Wrapped-style year in review. Minimal version shows core statistics.

**Tasks**:
- [ ] Create multiple sections (like slides):
  - [ ] Section 1: Total minutes listened
  - [ ] Section 2: Top 5 artists with images
  - [ ] Section 3: Top 5 tracks with images
  - [ ] Section 4: Top 3 genres (derived from top artists)
  - [ ] Section 5: Most listened track/artist
- [ ] Calculate total minutes from top tracks
- [ ] Extract genres from top artists
- [ ] Use StatCard component for stat display
- [ ] Add animated transitions between sections (slide effect)
- [ ] Use full-screen sections with Spotify colors
- [ ] Responsive full-screen layout

**Estimated Time**: 2 hours

**API Calls**:
- GET `/me/top/tracks?time_range=long_term&limit=50`
- GET `/me/top/artists?time_range=long_term&limit=50`

---

## Phase 4: Advanced Features

### 4.1 Playlist Recommendations Page
**File**: `pages/playlist/[id]/recommendations.tsx`

**Description**: Generate and display recommendations based on playlist tracks.

**Tasks**:
- [ ] Get playlist ID from router params
- [ ] Fetch playlist tracks
- [ ] Calculate audio features of all tracks (acousticness, energy, danceability, etc.)
- [ ] Use top 5 tracks as seed for recommendations
- [ ] Fetch recommendations from Spotify API
- [ ] Display recommendations in grid or list with TrackCard
- [ ] Show audio feature breakdown (chart or summary)
- [ ] Add "Add to Playlist" button (optional - requires additional scopes)
- [ ] Back button to playlist
- [ ] Loading and error states

**Estimated Time**: 2 hours

**API Calls**:
- GET `/playlists/{id}/tracks`
- GET `/audio-features?ids={trackIds}`
- GET `/recommendations?seed_tracks={trackIds}&limit=20`

---

### 4.2 Wrapped Page - Full Implementation
**File**: `pages/wrapped.tsx` (enhanced)

**Description**: Add advanced features to Wrapped page: quiz, shareable images, personalized playlists.

#### 4.2.1 Quiz Feature
**Tasks**:
- [ ] Create interactive quiz with Spotify trivia questions
- [ ] Questions based on user's top artists/tracks
- [ ] Show score at end
- [ ] Add quiz before or after wrapped stats
- [ ] Sample questions:
  - [ ] "Which of these artists do you listen to most?"
  - [ ] "How many minutes did you listen this year?"
  - [ ] "What's your most-played track?"

#### 4.2.2 Shareable Image Generation
**Tasks**:
- [ ] Install `html2canvas` library for screenshot generation
- [ ] Create shareable card design with:
  - [ ] User's top artist/track
  - [ ] Stats (minutes, artists count)
  - [ ] Custom message (e.g., "My 2024 Spotify Wrapped")
  - [ ] Spotify branding/color scheme
- [ ] Add "Download Image" button
- [ ] Add "Share on Social Media" buttons (generates pre-filled social media links)
- [ ] Test image quality on various screen sizes

#### 4.2.3 Personalized Playlist Generation
**Tasks**:
- [ ] After viewing wrapped stats, offer to create personalized playlist
- [ ] Use recommendations API based on top tracks
- [ ] Show preview of generated playlist
- [ ] Add "Create Playlist" button (requires user authorization)
- [ ] Success message with link to playlist on Spotify
- [ ] Handle authentication for playlist creation

**Estimated Time**: 3 hours

**API Calls**:
- GET `/me/top/tracks?limit=50` (seeds for recommendations)
- GET `/recommendations?seed_tracks={trackIds}&limit=30`
- POST `/playlists/{user_id}/tracks` (if creating playlist)

---

## Phase 5: Polish & Optimization

### 5.1 Add Helper Utilities
**File**: `utils/format.ts`

**Tasks**:
- [ ] Create `formatDuration(ms)` - Convert milliseconds to MM:SS
- [ ] Create `formatNumber(num)` - Format with commas (e.g., 1,000,000)
- [ ] Create `formatDate(date)` - Format date as "X days ago"
- [ ] Create `formatMinutes(ms)` - Convert total ms to hours/minutes
- [ ] Create `truncateText(text, length)` - Truncate long text with ellipsis

**Estimated Time**: 30 minutes

---

### 5.2 Add Error Handling & Edge Cases
**Tasks**:
- [ ] Handle empty data states (no artists, no playlists, etc.)
- [ ] Add placeholder images for missing album art
- [ ] Handle token expiration gracefully
- [ ] Add network error retry logic
- [ ] Create skeleton loading cards
- [ ] Handle 429 rate limiting from Spotify API
- [ ] Add toast notifications for errors/success

**Estimated Time**: 1.5 hours

---

### 5.3 Create Custom React Query Hooks
**Files**: `hooks/useSpotifyData.ts` and specific hooks

**Tasks**:
- [ ] Create `useMe()` hook for user profile
- [ ] Create `useTopArtists(timeRange, limit)` hook
- [ ] Create `useTopTracks(timeRange, limit)` hook
- [ ] Create `useMyPlaylists(limit)` hook
- [ ] Create `usePlaylistTracks(playlistId)` hook
- [ ] Create `useRecentlyPlayed(limit)` hook
- [ ] Create `useRecommendations(params)` hook
- [ ] Add loading/error states to each hook

**Estimated Time**: 1.5 hours

---

### 5.4 Create TODO.md File
**File**: `TODO.md` (this file)

**Tasks**:
- [x] ✅ Create comprehensive task breakdown (DONE)
- [x] ✅ Organize by phases and dependencies
- [x] ✅ Add time estimates
- [x] ✅ Include detailed descriptions

---

## Phase 6: Testing & Deployment (Optional)

### 6.1 Testing Tasks
**Tasks**:
- [ ] Test all pages on different screen sizes (mobile, tablet, desktop)
- [ ] Test loading states
- [ ] Test error handling
- [ ] Test navigation between pages
- [ ] Test time range filters
- [ ] Test pagination
- [ ] Manual testing of all Spotify API calls

---

### 6.2 Performance Optimization
**Tasks**:
- [ ] Lazy load images
- [ ] Optimize React Query cache strategy
- [ ] Add pagination to reduce initial data load
- [ ] Optimize bundle size
- [ ] Add performance monitoring

---

## Summary of Files to Create/Modify

### New Files to Create:
1. `utils/spotifyApi.ts` - Spotify API client
2. `components/Sidebar.tsx` - Navigation sidebar
3. `components/ArtistCard.tsx` - Artist display card
4. `components/TrackCard.tsx` - Track display card
5. `components/PlaylistCard.tsx` - Playlist display card
6. `components/TimeRangeSelector.tsx` - Time filter component
7. `components/Loader.tsx` - Loading spinner
8. `components/ErrorMessage.tsx` - Error display
9. `components/StatCard.tsx` - Stat display for wrapped
10. `utils/format.ts` - Formatting utilities
11. `hooks/useSpotifyData.ts` - Generic Spotify data hook
12. `hooks/useTopArtists.ts` - Top artists hook
13. `hooks/useTopTracks.ts` - Top tracks hook
14. `hooks/useMyPlaylists.ts` - Playlists hook
15. `hooks/usePlaylistTracks.ts` - Playlist tracks hook
16. `hooks/useRecentlyPlayed.ts` - Recently played hook
17. `hooks/useRecommendations.ts` - Recommendations hook
18. `pages/profile.tsx` - Profile page
19. `pages/top-artists.tsx` - Top artists page
20. `pages/top-tracks.tsx` - Top tracks page
21. `pages/playlists.tsx` - Playlists list page
22. `pages/playlist/[id].tsx` - Playlist details page
23. `pages/playlist/[id]/recommendations.tsx` - Recommendations page
24. `pages/recently-played.tsx` - Recently played page
25. `pages/wrapped.tsx` - Wrapped page
26. `TODO.md` - This file

### Files to Modify:
1. `package.json` - Add React Query and html2canvas
2. `tsconfig.json` - Already configured
3. `pages/_app.tsx` - Add QueryClientProvider
4. `layouts/Base.tsx` - Add Sidebar
5. `components/Main.tsx` - Redirect to profile
6. `utils/constant.ts` - Add Spotify API constants
7. `shared/interface.ts` - Add Spotify interfaces

---

## Estimated Total Time
- Phase 1 (Foundation): 3 hours
- Phase 2 (Components & Layout): 4 hours
- Phase 3 (Core Pages): 8 hours
- Phase 4 (Advanced Features): 5 hours
- Phase 5 (Polish): 4 hours
- **Total: ~24 hours** (can vary based on complexity and testing)

---

## Notes
- All pages should have proper authentication checks (redirect to login if not authenticated)
- Use React Query for all data fetching to avoid manual state management
- Follow existing code style and conventions (PascalCase components, absolute imports, Tailwind CSS)
- Test thoroughly on mobile devices (sidebar should be responsive)
- Consider adding a toast notification system for feedback
- All API calls should handle rate limiting and expired tokens gracefully