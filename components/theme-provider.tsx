'use client'

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// next-themes renders an inline <script> that applies the saved theme before first paint. It runs from the
// server HTML; if React ever re-creates it in the browser (e.g. after a hydration error elsewhere) it can't run
// and React 19 warns "Encountered a script tag". Marking the client copy as a data block silences that; the
// server copy stays executable, and next-themes sets suppressHydrationWarning on the tag for the type difference.
const scriptProps = { type: typeof window === 'undefined' ? 'text/javascript' : 'text/plain' }

export function ThemesProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider scriptProps={scriptProps} {...props}>{children}</NextThemesProvider>
}
