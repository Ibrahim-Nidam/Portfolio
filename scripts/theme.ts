/**
 * Theme Management Module
 * Handles dark/light mode with system preference detection
 */

export type Theme = 'light' | 'dark';

const THEME_KEY = 'portfolio-theme';

/**
 * Get user's system theme preference
 */
function getSystemTheme(): Theme {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

/**
 * Get saved theme or system preference
 */
function getSavedTheme(): Theme {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
        return saved;
    }
    return getSystemTheme();
}

/**
 * Apply theme to document
 */
function applyTheme(theme: Theme): void {
    const html = document.documentElement;

    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem(THEME_KEY, theme);

    // Update theme toggle buttons
    updateThemeButtons();
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme(): void {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

/**
 * Update theme toggle button icons
 */
function updateThemeButtons(): void {
    const isDark = document.documentElement.classList.contains('dark');

    // Update button aria labels for accessibility
    const themeButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    themeButtons.forEach(button => {
        button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
}

/**
 * Initialize theme system
 */
export function initTheme(): void {
    console.log('🎨 Initializing theme system...');

    // Apply saved or system theme immediately to prevent flash
    const initialTheme = getSavedTheme();
    applyTheme(initialTheme);

    // Setup theme toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        darkModeQuery.addEventListener('change', (e) => {
            // Only auto-update if user hasn't manually set a preference
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (!savedTheme) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    console.log(`✅ Theme initialized: ${initialTheme} mode`);
}