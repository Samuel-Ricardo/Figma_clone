'use client';

import { useTheme } from '@/store/theme/theme.store';
import { useEffect } from 'react';

export const ThemeProvider = () => {
  const { loadTheme } = useTheme();
  useEffect(() => loadTheme(), [loadTheme]);

  return <></>;
};
