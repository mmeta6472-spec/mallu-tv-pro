# MALLU TV PRO

A responsive live-TV / personal IPTV playlist web app built with React, Vite, and hls.js.

## Features in this starter
- Premium dark hybrid streaming interface with responsive desktop/mobile layouts
- Import M3U/M3U8 playlists from a local file or URL
- Parse channel names, groups, logos, IDs, and stream URLs from M3U metadata
- HLS playback via hls.js where browser support permits
- Channel search, category filters, favorites, recent channels
- Playlist manager and collapsible EPG placeholder
- Local browser storage for playlist and preference persistence
- Keyboard-accessible buttons and reduced-motion support

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Notes and limitations
- Demo tiles are placeholders, not working TV channels. Import your own playlist or authorized stream URLs.
- Browser-based playlist URL imports can fail when the host does not allow cross-origin (CORS) requests. Local playlist upload is the fallback. A production deployment can add a carefully secured backend importer.
- HLS playback requires a compatible stream, valid HTTPS/certificates, CORS headers when cross-origin playback needs them, and a browser/device that supports the codec. MPEG-DASH, DRM-protected services, and proprietary subscription platforms need additional playback/provider integrations.
- The quality selector is a preference UI; actual quality levels depend on the stream. Automatic HLS level selection is managed by hls.js.
- The EPG is currently a UI placeholder; XMLTV/EPG fetching and time-zone mapping are not yet wired.
- No channels are bundled. Add only streams/playlists you are authorized to access. This app does not bypass provider authentication, DRM, or regional licensing.
- This is a web app foundation, not a signed native mobile or Smart TV app. It can be packaged later with platform-specific work.
- Playlist URLs and channel data are stored in browser localStorage. Do not use this on shared/public computers for private playlist credentials.

## Deployment
Deploy as a static Vite site on any static hosting platform. Build command: `npm run build`; output directory: `dist`.

## Ready-to-open build (offline project build)

A dependency-free static build is included at `dist/index.html`. It was generated locally because npm registry access was unavailable in the build environment. Open `dist/index.html` in a modern browser, or deploy the `dist/` folder to any static hosting service. The player loads hls.js from jsDelivr, so HLS playback requires an internet connection; individual streams may also be offline, geo-restricted, or block browser playback.

The original Vite + React source is preserved. To install its dependencies and use the original development workflow when npm registry access is available:

```bash
npm install
npm run dev
```

To rebuild the original React/Vite app, run `npm run build` after dependencies have been installed. The included static build is a lightweight fallback and is not a Vite-generated bundle.


### Sports category
Includes 13 user-provided sports stream URLs under the Sports category. Stream availability and authorization depend on the source provider.


### Hindi channels
Added 23 Hindi-category streams, including Hindi Hits, Music India, MBC Bollywood, Zee Cinema APAC, 9X music channels, B4U Movies, Bollywood feeds, and additional provider feeds. Stream availability is not guaranteed.