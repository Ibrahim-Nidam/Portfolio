/**
 * GitHub API Integration Module
 * Loads pre-generated repository data from repos.json
 * No live API calls needed!
 */

import { repos } from '../dist/repos.js';

interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    languages: string[];
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
    fork: boolean;
    private: boolean;
}

let allRepositories: Repository[] = repos;
let currentLanguage: string = 'all';

/**
 * Get unique languages from ALL repo languages
 */
function getUniqueLanguages(repos: Repository[]): string[] {
    const languages = new Set<string>();
    repos.forEach(repo => {
        repo.languages.forEach(lang => languages.add(lang));
    });
    return Array.from(languages).sort();
}

/**
 * Create language filter buttons
 */
function createLanguageFilters(languages: string[]): void {
    const filterContainer = document.querySelector('.lang-filter')?.parentElement;
    if (!filterContainer) return;

    const allButton = filterContainer.querySelector('[data-lang="all"]');
    filterContainer.innerHTML = '';
    if (allButton) {
        filterContainer.appendChild(allButton);
    }

    languages.forEach(lang => {
        const button = document.createElement('button');
        button.className = 'lang-filter px-4 py-2 rounded-full text-sm font-semibold transition-all bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold-500 hover:text-white';
        button.setAttribute('data-lang', lang);
        button.textContent = lang;
        button.addEventListener('click', () => filterByLanguage(lang));
        filterContainer.appendChild(button);
    });
}

/**
 * Filter repositories by ANY language match
 */
function filterByLanguage(language: string): void {
    currentLanguage = language;

    const filterButtons = document.querySelectorAll('.lang-filter');
    filterButtons.forEach(button => {
        button.classList.remove('active', 'bg-gold-500', 'text-white');
        button.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
    });

    const activeButton = document.querySelector(`[data-lang="${language}"]`);
    if (activeButton) {
        activeButton.classList.add('active', 'bg-gold-500', 'text-white');
        activeButton.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
    }

    const filteredRepos = language === 'all'
        ? allRepositories
        : allRepositories.filter(repo => repo.languages.includes(language));

    console.log(`📊 ${language}: ${filteredRepos.length} repos`);
    displayRepositories(filteredRepos);
}

/**
 * Get language icon/emoji
 */
function getLanguageIcon(language: string): string {
    const icons: Record<string, string> = {
        'JavaScript': '🟨', 'TypeScript': '🔷', 'Java': '☕', 'Python': '🐍',
        'PHP': '🐘', 'HTML': '🌐', 'CSS': '🎨', 'C': '©️', 'C++': '➕',
        'C#': '#️⃣', 'Go': '🐹', 'Rust': '🦀', 'Ruby': '💎', 'Swift': '🦅',
        'Kotlin': '🅺', 'Shell': '🐚', 'Dart': '🎯', 'Twig': '🌿'
    };
    return icons[language] || '💻';
}

/**
 * Get language color
 */
function getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
        'JavaScript': '#F7DF1E', 'TypeScript': '#3178C6', 'Java': '#B07219',
        'Python': '#3776AB', 'PHP': '#777BB4', 'HTML': '#E34F26', 'CSS': '#1572B6',
        'C': '#555555', 'C++': '#F34B7D', 'C#': '#239120', 'Go': '#00ADD8',
        'Rust': '#DEA584', 'Ruby': '#CC342D', 'Swift': '#FA7343', 'Kotlin': '#A97BFF',
        'Shell': '#89E051', 'Twig': '#000000', 'Dart': '#00B4AB'
    };
    return colors[language] || '#6B7280';
}

/**
 * Format date to relative time
 */
function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Display repositories with MULTIPLE language badges
 */
function displayRepositories(repos: Repository[]): void {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    if (repos.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-600 dark:text-gray-400">No repositories found for this language.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = repos.map(repo => `
        <div class="card-hover bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all">
            <div class="p-6 space-y-4">
                <!-- MULTIPLE Language Badges -->
                ${repo.languages.length > 0 ? `
                    <div class="flex flex-wrap gap-2">
                        ${repo.languages.map(lang => `
                            <div class="flex items-center space-x-1">
                                <span class="text-lg">${getLanguageIcon(lang)}</span>
                                <span class="px-2 py-1 rounded-full text-xs font-semibold" style="background-color: ${getLanguageColor(lang)}20; color: ${getLanguageColor(lang)}">
                                    ${lang}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <!-- Repository Name -->
                <h3 class="text-xl font-bold text-black dark:text-white line-clamp-1">
                    ${repo.name}
                </h3>
                
                <!-- Description -->
                <p class="text-gray-600 dark:text-gray-400 line-clamp-3 min-h-[4.5rem]">
                    ${repo.description || 'No description available'}
                </p>
                
                <!-- Topics -->
                ${repo.topics && repo.topics.length > 0 ? `
                    <div class="flex flex-wrap gap-2">
                        ${repo.topics.slice(0, 3).map(topic => `
                            <span class="px-2 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded text-xs">
                                #${topic}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                
                <!-- Stats & Link -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span>${repo.stargazers_count}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span>${repo.forks_count}</span>
                        </div>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="group flex items-center space-x-1 text-gold-500 hover:text-gold-600 font-semibold transition-colors">
                        <span>View</span>
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>
                
                <!-- Updated Date -->
                <div class="text-xs text-gray-500 dark:text-gray-500">
                    Updated ${formatRelativeTime(repo.updated_at)}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Show loading state
 */
function showLoading(): void {
    const loading = document.getElementById('portfolio-loading');
    const grid = document.getElementById('portfolio-grid');
    const error = document.getElementById('portfolio-error');

    if (loading) loading.classList.remove('hidden');
    if (grid) grid.classList.add('hidden');
    if (error) error.classList.add('hidden');
}

/**
 * Show error state
 */
function showError(): void {
    const loading = document.getElementById('portfolio-loading');
    const grid = document.getElementById('portfolio-grid');
    const error = document.getElementById('portfolio-error');

    if (loading) loading.classList.add('hidden');
    if (grid) grid.classList.add('hidden');
    if (error) error.classList.remove('hidden');
}

/**
 * Show portfolio grid
 */
function showGrid(): void {
    const loading = document.getElementById('portfolio-loading');
    const grid = document.getElementById('portfolio-grid');
    const error = document.getElementById('portfolio-error');

    if (loading) loading.classList.add('hidden');
    if (grid) grid.classList.remove('hidden');
    if (error) error.classList.add('hidden');
}

/**
 * Initialize GitHub portfolio section
 * Now loads from pre-generated JSON instead of fetching live!
 */
export async function initGithubPortfolio(): Promise<void> {
    console.log('📦 Initializing GitHub portfolio from generated data...');

    try {
        if (allRepositories.length === 0) {
            throw new Error('No repositories found in data');
        }

        const languages = getUniqueLanguages(allRepositories);
        createLanguageFilters(languages);

        displayRepositories(allRepositories);
        showGrid();

        const allButton = document.querySelector('[data-lang="all"]');
        if (allButton) {
            allButton.addEventListener('click', () => filterByLanguage('all'));
        }

        console.log(`✅ GitHub portfolio initialized: ${allRepositories.length} repos with multi-language support`);

    } catch (error) {
        console.error('Failed to initialize GitHub portfolio:', error);
        showError();
    }
}