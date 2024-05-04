const firstInputElement = document.getElementById('top-eq-input-1');
const secondInputElement = document.getElementById('top-eq-input-2');
const distributionEquationElement = document.querySelector('.input-element');
const solveButton = document.querySelector('.solve');
const answerElement = document.querySelector('.answer');

let firstInput = false;
let secondInput = false;

firstInputElement.addEventListener('input', checkBoth());
secondInputElement.addEventListener('input', checkBoth());

firstInputElement.addEventListener('input', () => {
    firstInput = true;
    checkBoth();
});

secondInputElement.addEventListener('input', () => {
    secondInput = true;
    checkBoth();
});

function checkBoth() {
    if(firstInput && secondInput) {
        action();
    }
}

function action() {
    var firstInputVal = firstInputElement.value.trim();
    var secondInputVal = secondInputElement.value.trim();

    if(firstInputVal !== '' && secondInputVal !== '') {
        distributionEquationElement.classList.add('active');
        solveButton.style.display = 'block';
    } else {
        distributionEquationElement.classList.remove('active');
        solveButton.style.display = 'none';
        answerElement.style.display = 'none';
    }
}
