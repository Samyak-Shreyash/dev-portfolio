# Project notes

## Browser support

**Browser Support:** Target Baseline Widely available. Newly available features are allowed only when feature-detected with graceful degradation (`@supports`, `CSS.supports()`, `'x' in obj`), and any fallback must add no more than 20 lines and no new dependencies. Never ship polyfills; use a lightweight fallback or a simpler design instead.

- Server-only code runs on Node 22+, so ES2023 APIs (e.g. `Array.prototype.toSorted`) are fine there; `tsconfig.json` targets ES2023.
