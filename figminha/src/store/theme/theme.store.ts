import { MODULES } from '@/@modules/app.factory';
import { IThemeStore, Theme } from '@/@types/store/theme.type';
import { create } from 'zustand';

const { THEME } = MODULES.INFRA.CONFIG.CONST().STORAGE.KEY;

export const useTheme = create<IThemeStore>(set => ({
  theme: 'light',
  setTheme: (theme: Theme) => {
    localStorage.setItem(THEME, theme);
    document.body.setAttribute('data-theme', theme);

    set({ theme });
  },

  loadTheme: () => {
    const theme = (localStorage.getItem(THEME) as Theme) || 'light';

    document.body.setAttribute('data-theme', theme);
    set({ theme });
  },
}));
