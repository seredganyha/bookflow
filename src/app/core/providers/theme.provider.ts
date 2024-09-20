import { Provider } from "@angular/core";
import { CURRENT_THEME } from "../tokens/theme-token";
import { ThemeService } from "../services/theme.service";
import { THEMES } from "../tokens/themes-token";

export const CURRENT_THEME_FACTORY = (themeService: ThemeService) => themeService.currentTheme$;

export const CURRENT_THEME_PROVIDERS: Provider[] = [
  {
      provide: CURRENT_THEME,
      useFactory: CURRENT_THEME_FACTORY,
      deps: [ThemeService],

  },
];

export const THEMES_FACTORY = (themeService: ThemeService) => themeService.themes$;

export const THEMES_PROVIDERS: Provider[] = [
  {
        provide: THEMES,
        useFactory: THEMES_FACTORY,
        deps: [ThemeService],

  },
]





