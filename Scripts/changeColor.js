const mainButton = document.getElementById('main-button');
mainButton.addEventListener('click', change);

function change() {
    const root = document.documentElement;

    const red = getRandomNumber();
    const green = getRandomNumber();
    const blue = getRandomNumber();

    root.style.setProperty('--box-shadow-color', `${red}, ${green}, ${blue}`);
}

function getRandomNumber() {
    const min = 20;
    const max = 240;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}