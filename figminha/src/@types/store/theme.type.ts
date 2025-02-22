export interface IThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadTheme: () => void;
}

export type Theme = 'light' | 'dark';
