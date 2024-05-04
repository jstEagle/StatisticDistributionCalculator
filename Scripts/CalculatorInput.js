const probabilityInputElement = document.getElementById('top-eq-input');
const distributionEquationElement = document.querySelector('.input-element');
const solveButton = document.querySelector('.solve');
const answerElement = document.querySelector('.answer');

probabilityInputElement.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        distributionEquationElement.classList.add('active');
        solveButton.style.display = 'block';
    } else {
        distributionEquationElement.classList.remove('active');
        solveButton.style.display = 'none';
        answerElement.style.display = 'none';
    }
});
