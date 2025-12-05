const texto1 = document.querySelector(".texto1");
const texto2 = document.querySelector(".texto2");
const welcome = document.querySelector(".welcome");
const welcomeLogo = document.querySelector("#welcomeLogo");

setTimeout(() => {
    texto1.style.opacity = 1;
}, 3000);

setTimeout(() => {
    welcomeLogo.style.opacity = 0;
    texto1.style.opacity = 0;

}, 6000);

setTimeout(() => {
    welcomeLogo.style.display = 'none';
    texto1.style.display = 'none';

}, 7000);

setTimeout(() => {
    texto2.style.opacity = 1;
}, 7100);

setTimeout(() => {
    welcome.style.opacity = 0;
    texto2.style.opacity = 0;
}, 9000);

setTimeout(() => {
    welcome.style.opacity = 0;
    welcome.style.display = "none";
}, 10000);