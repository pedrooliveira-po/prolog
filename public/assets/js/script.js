window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const hero = document.querySelector('.hero');

    const heroRect = hero.getBoundingClientRect();

    if (heroRect.bottom < 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const header = document.querySelector('header');
const hamburguer = document.querySelector('.hamburguer')

hamburguer.addEventListener('click', () => {
    header.classList.toggle('menu');
})

document.addEventListener('click', (event) => {
    if (header.classList.contains('menu')) {
        if (!nav.contains(event.target) && !hamburguer.contains(event.target)) {
            header.classList.remove('menu');
        }
    }
});