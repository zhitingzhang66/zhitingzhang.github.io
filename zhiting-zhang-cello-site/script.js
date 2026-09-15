const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? 'Close' : 'Menu';
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
