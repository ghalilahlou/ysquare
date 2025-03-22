document.addEventListener('DOMContentLoaded', () => {
  // Gestion du menu mobile
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Changement de style du header lors du scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Charger dynamiquement les rubriques
  loadRubrics();
});

/**
 * Charge la liste des rubriques de façon asynchrone.
 * Tente d'abord de récupérer les données depuis un fichier JSON externe,
 * sinon utilise des données locales en fallback.
 */
async function loadRubrics() {
  let rubricsData;
  try {
    rubricsData = await fetchRubricsFromJSON();
    console.log("Rubriques chargées depuis le JSON externe :", rubricsData);
  } catch (err) {
    console.warn("Échec de chargement via JSON, utilisation du fallback local.");
    rubricsData = getLocalRubricsFallback();
  }

  const rubricsList = document.getElementById('rubrics-list');
  if (!rubricsList) return;

  rubricsData.forEach(rubric => {
    const item = document.createElement('div');
    item.classList.add('rubric-item');
    item.innerHTML = `
      <h3>${rubric.title}</h3>
      <p>${rubric.description}</p>
    `;
    rubricsList.appendChild(item);
  });

  // Appliquer une animation d'apparition aux rubriques
  observeRubricItems();
}

/**
 * Essaie de charger les rubriques depuis "assets/data/rubrics.json".
 */
async function fetchRubricsFromJSON() {
  const response = await fetch('assets/data/rubrics.json');
  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }
  return await response.json();
}

/**
 * Données locales en fallback.
 */
function getLocalRubricsFallback() {
  return [
    {
      title: "Transformation Digitale",
      description: "Optimisez vos processus en adoptant les dernières technologies numériques."
    },
    {
      title: "Cybersécurité",
      description: "Protégez vos données et infrastructures face aux menaces actuelles."
    },
    {
      title: "Gestion de Projets IT",
      description: "Pilotez vos projets informatiques de A à Z avec un accompagnement sur mesure."
    }
  ];
}

/**
 * Utilise IntersectionObserver pour animer l'apparition des rubriques.
 */
function observeRubricItems() {
  const items = document.querySelectorAll('.rubric-item');
  if (!items) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  items.forEach(item => {
    observer.observe(item);
  });
}
