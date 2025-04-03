'use client'

import * as React from 'react'
import {
  ThemeProvider,
  type ThemeProviderProps,
  useTheme,
} from 'next-themes'
import { useEffect, useState } from 'react';

export function ThemesProvider({ children, ...props }: ThemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
}, []);

if (!mounted) {
  return null; // Or a loading state
}
return (<ThemeProvider {...props}>{children}</ThemeProvider>
);
}
