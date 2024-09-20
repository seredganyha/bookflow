import { Theme } from "./theme";

export interface Settings {
  fragmentsResendInterval: number;
  fragmentCharLimit: number;
  currentTheme: Theme;
}