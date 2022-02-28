import i18Obj from './translate.js';

// toggle hamburger menu
const menu = document.querySelector('.hamburger-menu');

menu.addEventListener('click', () => {
  const icon = menu.querySelector('.hamburger-menu__icon');
  const navigation = menu.querySelector('.hamburger__navigation');
  icon.classList.toggle('hamburger-menu__icon_opened');
  navigation.classList.toggle('hamburger__navigation_opened');
});

// filter portfolio images
const portfolioFilters = document.querySelectorAll('.filters__item');

window.addEventListener('load', () => {
  portfolioFilters.forEach(el => el.classList.contains('btn_active') && setImagesForSeason(el.dataset.season));
});

portfolioFilters.forEach(el => {
  el.addEventListener('click', (event) => {
    portfolioFilters.forEach(el => {
      el.classList.remove('btn_active');
      el.classList.add('btn_inactive');
    });
    event.target.classList.remove('btn_inactive');
    event.target.classList.add('btn_active');
    setImagesForSeason(event.target.dataset.season);
  });
});

function setImagesForSeason (season) {
  const images = document.querySelectorAll('.gallery__img');
  images.forEach((el, index) => {
    el.setAttribute('src', `./assets/images/gallery/${season}/${index + 1}.jpg`);
  });
};

// translate the page
const switchLanguageItem = document.querySelectorAll('.switch-language__item');

switchLanguageItem.forEach(el => {
  el.addEventListener('click', (event) => {
    switchLanguageItem.forEach(el => el.classList.remove('switch-language__item_active'));
    getTranslation(event.target, event.target.dataset.language);
    sessionStorage.setItem('language', event.target.dataset.language);
  });
});

function getTranslation (targetElement, language) {
  let elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => el.textContent = i18Obj[language][el.dataset.i18n]);
  targetElement.classList.add('switch-language__item_active');
};

// switch the theme
const switchTheme = document.querySelector('.switch-theme');

switchTheme.addEventListener('click', (event) => {
  event.target.classList.contains('switch-theme_light')
    ? (changeTheme(event.target, 'dark'), sessionStorage.setItem('theme', 'dark'))
    : (changeTheme(event.target, 'light'), sessionStorage.setItem('theme', 'light'));
});

function changeTheme(targetElement, mode) {
  mode === 'dark'
    ? (targetElement.classList.remove('switch-theme_light'),
    document.body.classList.remove('light-theme'))
    : (targetElement.classList.add('switch-theme_light'),
      document.body.classList.add('light-theme'));
};

window.addEventListener('load', () => {
  // session storage is not empty
  if (sessionStorage.getItem('language') !== null || sessionStorage.getItem('theme') !== null) {
    changeTheme(switchTheme, sessionStorage.getItem('theme'));
    switchLanguageItem.forEach(el => {
      if (el.dataset.language === sessionStorage.getItem('language')) {
        getTranslation(el, sessionStorage.getItem('language'));
      }
    });
  } else {
    // default state
    sessionStorage.setItem('language', 'en');
    sessionStorage.setItem('theme', 'dark');
    changeTheme(switchTheme, 'dark');
    switchLanguageItem.forEach(el => {
      el.dataset.language === 'en' && getTranslation(el, sessionStorage.getItem('language'));
    });
  }
});

console.log(`
  Самостоятельная оценка: 85 (75) баллов
  Смена изображений в секции portfolio +25
  Перевод страницы на два языка +25
  Переключение светлой и тёмной темы +25
  Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
  Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5
`);
