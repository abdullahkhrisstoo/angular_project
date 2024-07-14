import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light-theme' | 'dark-theme' = 'light-theme';

  constructor() {}

  setTheme(theme: 'light-theme' | 'dark-theme'): void {
    this.currentTheme = theme;
    this.updateThemeVariables();
  }

  getCurrentTheme(): 'light-theme' | 'dark-theme' {
    return this.currentTheme;
  }

  private updateThemeVariables() {
    const themeClass = this.currentTheme;
    const root = document.documentElement;

    if (themeClass === 'light-theme') {
      root.style.setProperty('--primary-color', '#007bff');
      root.style.setProperty('--on-primary-color', '#ffffff');
      root.style.setProperty('--secondary-color', '#6c757d');
      root.style.setProperty('--on-secondary-color', '#ffffff');
      root.style.setProperty('--tertiary-color', '#28a745');
      root.style.setProperty('--on-tertiary-color', '#ffffff');
      root.style.setProperty('--success-color', '#28a745');
      root.style.setProperty('--on-success-color', '#ffffff');
      root.style.setProperty('--error-color', '#dc3545');
      root.style.setProperty('--on-error-color', '#ffffff');
      root.style.setProperty('--info-color', '#17a2b8');
      root.style.setProperty('--on-info-color', '#ffffff');
      root.style.setProperty('--warning-color', '#ffc107');
      root.style.setProperty('--on-warning-color', '#000000');
      root.style.setProperty('--background-color', '#f8f9fa');
      root.style.setProperty('--surface-color', '#ffffff');
      root.style.setProperty('--text-color', '#343a40');
      // Add more variables for light theme
    } else {
      root.style.setProperty('--primary-color', '#1e90ff');
      root.style.setProperty('--on-primary-color', '#ffffff');
      root.style.setProperty('--secondary-color', '#adb5bd');
      root.style.setProperty('--on-secondary-color', '#ffffff');
      root.style.setProperty('--tertiary-color', '#28a745');
      root.style.setProperty('--on-tertiary-color', '#ffffff');
      root.style.setProperty('--success-color', '#28a745');
      root.style.setProperty('--on-success-color', '#ffffff');
      root.style.setProperty('--error-color', '#dc3545');
      root.style.setProperty('--on-error-color', '#ffffff');
      root.style.setProperty('--info-color', '#17a2b8');
      root.style.setProperty('--on-info-color', '#ffffff');
      root.style.setProperty('--warning-color', '#ffc107');
      root.style.setProperty('--on-warning-color', '#000000');
      root.style.setProperty('--background-color', '#343a40');
      root.style.setProperty('--surface-color', '#495057');
      root.style.setProperty('--text-color', '#ffffff');
    }
  }
}
