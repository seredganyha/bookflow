import { InjectionToken } from "@angular/core";
import { Theme } from "../../types/theme";

export const THEMES = new InjectionToken<Theme[]>('THEMES');