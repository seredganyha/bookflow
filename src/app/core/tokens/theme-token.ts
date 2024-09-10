import { InjectionToken } from "@angular/core";
import { Theme } from "../../types/theme";
import { Observable } from "rxjs";


export type СurrentThemeProvider = Observable<Theme>;

export const CURRENT_THEME = new InjectionToken<СurrentThemeProvider>('CURRENT_THEME');

