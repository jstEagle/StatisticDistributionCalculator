const inputElement = document.getElementById('eq');
const answerEquationElement = document.getElementById('equation-answer');
const numberAnswerElement = document.getElementById('number-answer');

inputElement.addEventListener('input', function() {
    if(this.value.trim() !== '') {
        const equationString = this.value.trim();
        const pattern = /x\s*(<=|>=|=|<|>)\s*(\d+)/i;

        const match = pattern.exec(equationString);
        var probabilityField = document.getElementById('top-eq-input');
        const p = parseFloat(probabilityField.value);

        if(match) {
            var answer = 0;
            const operator = match[1];
            const r = parseInt(match[2]);

            const q = 1 - p;

            if(operator == '=') {
                answer = p * (q ** (r -1));
                answerEquationElement.textContent = `\\(p(X=${r}) = ${p} * ${q}^{${r}} \\)`;
            }
            else if(operator == '<') {
                answer = 1 - (q ** (r-1));
                answerEquationElement.textContent = `\\(p(X<${r}) = 1-p(X\\ge${r}) = 1-p(X>${r-1}) = 1 - ${q}^{${r-1}} \\)`;
            }
            else if(operator == '>') {
                answer = q ** r;
                answerEquationElement.textContent = `\\(p(X>${r}) = ${q}^{${r}} \\)`;
            }
            else if(operator == '>=') {
                answer = 1 - (q ** r);
                answerEquationElement.textContent = `\\(p(X\\ge${r}) = 1 - ${q}^{${r}} \\)`;
            }
            else if(operator == '<=') {
                answer = 1 - (q ** r);
                answerEquationElement.textContent = `\\(p(X\\le${r}) = 1 - ${q}^{${r}} \\)`;
            }

            if(r < 15) {
                answer = truncateDecimals(answer, 6);
            }

            numberAnswerElement.textContent = `\\(= ${answer}\\)`;
        }

        MathJax.typeset();
    } else {
        numberAnswerElement.textContent = "";
        answerEquationElement.textContent = "";
    }
});

function truncateDecimals(number, decimalPlaces) {
  const strNumber = number.toString();
  const decimalIndex = strNumber.indexOf('.');

  if (decimalIndex !== -1) {
    const truncatedStr = strNumber.slice(0, decimalIndex + decimalPlaces + 1); // +1 to keep the decimal point
    return parseFloat(truncatedStr);
  } else {
    return number; // Return the original number if it doesn't have decimal places
  }
}
