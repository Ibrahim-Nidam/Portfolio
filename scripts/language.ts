/**
 * Language Management Module
 * Handles internationalization (i18n) with French and English support
 */

export type Language = 'en' | 'fr';

const LANG_KEY = 'portfolio-language';

// Translation data structure
interface Translations {
    [key: string]: {
        en: string;
        fr: string;
    };
}

// All translations
const translations: Translations = {
    'nav.about': { en: 'About', fr: 'À propos' },
    'nav.skills': { en: 'Skills', fr: 'Compétences' },
    'nav.portfolio': { en: 'Portfolio', fr: 'Portfolio' },
    'nav.contact': { en: 'Contact', fr: 'Contact' },

    'hero.title': { en: 'Full Stack Developer', fr: 'Développeur Full Stack' },
    'hero.subtitle': { en: 'Crafting innovative digital solutions with modern technologies', fr: 'Création de solutions numériques innovantes avec des technologies modernes' },
    'hero.viewWork': { en: 'View My Work', fr: 'Voir Mon Travail' },

    'about.title': { en: 'About', fr: 'À propos' },
    'about.intro': { en: 'Passionate Full Stack Developer with a strong foundation in modern web technologies. I specialize in building scalable, user-centric applications that solve real-world problems.', fr: 'Développeur Full Stack passionné avec une solide base en technologies web modernes. Je me spécialise dans la création d\'applications évolutives et centrées sur l\'utilisateur qui résolvent des problèmes concrets.' },
    'about.background': { en: 'With a bachelors in Industrial Engineering and specialized training from YouCode - UM6P, I bring a unique perspective combining technical expertise with problem-solving skills. I\'ve successfully delivered 20+ projects ranging from console applications to full-stack web solutions.', fr: 'Avec une licence en Génie Industriel et une formation spécialisée de YouCode - UM6P, j\'apporte une perspective unique combinant expertise technique et compétences en résolution de problèmes. J\'ai livré avec succès plus de 20 projets allant des applications console aux solutions web full-stack.' },
    'about.passion': { en: 'My passion lies in creating elegant solutions with clean code, implementing best practices, and continuously learning new technologies to stay at the forefront of web development.', fr: 'Ma passion réside dans la création de solutions élégantes avec du code propre, la mise en œuvre des meilleures pratiques et l\'apprentissage continu de nouvelles technologies pour rester à la pointe du développement web.' },

    'skills.title': { en: 'Skills', fr: 'Compétences' },
    'skills.all': { en: 'All', fr: 'Tout' },
    'skills.frontend': { en: 'Front-end', fr: 'Front-end' },
    'skills.backend': { en: 'Back-end', fr: 'Back-end' },
    'skills.database': { en: 'Database', fr: 'Base de données' },
    'skills.tools': { en: 'Tools', fr: 'Outils' },

    'portfolio.title': { en: 'Portfolio', fr: 'Portfolio' },
    'portfolio.subtitle': { en: 'Explore my GitHub repositories with live filtering by programming language', fr: 'Explorez mes dépôts GitHub avec filtrage en direct par langage de programmation' },
    'portfolio.loading': { en: 'Loading repositories...', fr: 'Chargement des dépôts...' },
    'portfolio.error': { en: 'Unable to load repositories. Please try again later.', fr: 'Impossible de charger les dépôts. Veuillez réessayer plus tard.' },
    'portfolio.viewRepo': { en: 'View Repository', fr: 'Voir le dépôt' },
    'portfolio.stars': { en: 'stars', fr: 'étoiles' },
    'portfolio.forks': { en: 'forks', fr: 'forks' },

    'contact.title': { en: 'Get', fr: 'Me' },
    'contact.description': { en: 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.', fr: 'Je suis toujours ouvert à discuter de nouveaux projets, d\'idées créatives ou d\'opportunités de faire partie de vos visions.' },
    'contact.email': { en: 'Email', fr: 'Email' },
    'contact.phone': { en: 'Phone', fr: 'Téléphone' },
    'contact.location': { en: 'Location', fr: 'Localisation' },
    'contact.follow': { en: 'Follow me', fr: 'Suivez-moi' },
    'contact.form.name': { en: 'Name', fr: 'Nom' },
    'contact.form.email': { en: 'Email', fr: 'Email' },
    'contact.form.subject': { en: 'Subject', fr: 'Sujet' },
    'contact.form.message': { en: 'Message', fr: 'Message' },
    'contact.form.submit': { en: 'Send Message', fr: 'Envoyer le message' },

    'footer.copyright': { en: '© 2024 Ibrahim Nidam. All rights reserved.', fr: '© 2024 Ibrahim Nidam. Tous droits réservés.' }
};

/**
 * Get user's browser language preference
 */
function getBrowserLanguage(): Language {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) {
        return 'fr';
    }
    return 'en';
}

/**
 * Get saved language or browser preference
 */
function getSavedLanguage(): Language {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'fr') {
        return saved;
    }
    return getBrowserLanguage();
}

/**
 * Translate a single element
 */
function translateElement(element: Element, lang: Language): void {
    const key = element.getAttribute('data-translate');
    if (key && translations[key]) {
        const translation = translations[key][lang];

        // Check if element is an input placeholder
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            (element as HTMLInputElement).placeholder = translation;
        } else {
            element.textContent = translation;
        }
    }
}

/**
 * Apply language to entire document
 */
function applyLanguage(lang: Language): void {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => translateElement(element, lang));

    // Save preference
    localStorage.setItem(LANG_KEY, lang);

    // Update language toggle buttons
    updateLanguageButtons(lang);
}

/**
 * Toggle between English and French
 */
function toggleLanguage(): void {
    const currentLang = (localStorage.getItem(LANG_KEY) || 'en') as Language;
    const newLang: Language = currentLang === 'en' ? 'fr' : 'en';
    applyLanguage(newLang);
}

/**
 * Update language toggle button text
 */
function updateLanguageButtons(lang: Language): void {
    const langButtons = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
    langButtons.forEach(button => {
        button.textContent = lang === 'en' ? 'EN' : 'FR';
        button.setAttribute('aria-label', `Switch to ${lang === 'en' ? 'French' : 'English'}`);
    });
}

/**
 * Initialize language system
 */
export function initLanguage(): void {
    console.log('🌍 Initializing language system...');

    // Apply saved or browser language immediately
    const initialLang = getSavedLanguage();
    applyLanguage(initialLang);

    // Setup language toggle buttons
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', toggleLanguage);
    }

    console.log(`✅ Language initialized: ${initialLang}`);
}

/**
 * Get current language (useful for other modules)
 */
export function getCurrentLanguage(): Language {
    return getSavedLanguage();
}