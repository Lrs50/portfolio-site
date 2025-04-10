// Color mode logic

const themeBtn = document.getElementById('tema');
const body = document.body;
let currentTranslations = {};

themeBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
      updateThemeButtonText(currentTranslations)
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateThemeButtonText(currentTranslations)
    }
  });

function updateThemeButtonText(translations){
    const themeBtn = document.getElementById('tema')
    const themeGroup = themeBtn.getAttribute('data-i18n-group');
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const label = getNestedValue(translations, `${themeGroup}.${currentTheme}`);
    if (label) {
        themeBtn.textContent = label;
    }
}

// Language Logic

const langBtn = document.getElementById('lingua');  
let currentLang = localStorage.getItem('lang') || 'en';

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function applyTranslations(translations){
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el =>{
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        if (value){
            const tag = el.tagName.toLowerCase();
            if (tag === 'input' || tag === 'textarea') {
                if (el.placeholder !== undefined) {
                  el.placeholder = value;
                } else {
                  el.value = value;
                }
              } else if (tag === 'title') {
                document.title = value;
              } else {
                el.textContent = value;
            }
        }   
    });
}

async function loadLanguage(lang){
    try{
        const res = await fetch(`./lang/${lang}.json`)
        const translations = await res.json();
        currentTranslations = translations
        applyTranslations(translations);
        localStorage.setItem('lang',lang);
        currentLang = lang;

        // After loading the language
        const savedTheme = localStorage.getItem('theme')?.toLowerCase();;
        if (savedTheme==='dark'){
            body.classList.add('dark')
            updateThemeButtonText(currentTranslations)
        } else if (savedTheme=='light'){
            body.classList.add('light')
            updateThemeButtonText(currentTranslations)
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                body.classList.add('dark');
                updateThemeButtonText(currentTranslations)
            }else{
                body.classList.add('light');
                updateThemeButtonText(currentTranslations)
            }
        }
        
    } catch (e) {
        console.error(`Error loading language ${e}`)
    }
}

langBtn.addEventListener('click', () => {
    const languages = ['pt', 'en', 'fr']; 
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length
    const nextLang = languages[nextIndex];
    loadLanguage(nextLang);
});


// Load language on page load
loadLanguage(currentLang);
