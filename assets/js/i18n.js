function loadLanguage(lang) {
  fetch(`assets/lang/${lang}.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }
      return res.json();
    })
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    })
    .catch(err => console.error("Erreur de chargement des traductions:", err));
  
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'fr';
  const langSwitcher = document.getElementById('lang-switcher');

  if (langSwitcher) {
    langSwitcher.value = savedLang;
    loadLanguage(savedLang);

    langSwitcher.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      loadLanguage(selectedLang);
    });
  } else {
    console.error("L'élément de sélection de langue (id='lang-switcher') est introuvable.");
  }
});
