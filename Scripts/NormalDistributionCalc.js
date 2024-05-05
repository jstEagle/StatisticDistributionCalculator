const inputElement = document.getElementById('eq');
const answerEquationElement = document.getElementById('equation-answer');
const numberAnswerElement = document.getElementById('number-answer');

inputElement.addEventListener('input', function() {
    if(this.value.trim() !== '') {
        const equationString = this.value.trim();
        const pattern = /x\s*(<=|>=|=|<|>)\s*(\d+)/i;

        const match = pattern.exec(equationString);
        var meanField = document.getElementById('top-eq-input-1');
        var varField = document.getElementById('top-eq-input-2');

        const mean = parseFloat(meanField.value);
        const varValue = parseFloat(varField.value);
        const stdDev = Math.sqrt(varValue);

        if(match) {
            var answer = 0;
            const operator = match[1];
            const r = parseFloat(match[2]);

            if(operator == '=') {
                answerEquationElement.textContent = `\\(p(X=${r}) \\rightarrow \\frac{1}{\\infty}\\)`;
            }
            else if(operator == '<') {
                answer = 1;
                
                var z = (r - mean) / stdDev;
                answer -= 1 - calculateProbability(z);

                answerEquationElement.textContent = `\\(p(X < ${r}) = 1 - p(X \\ge ${r}) = 1 - (1 - p(X \\le ${r})) = 1 - (1 -\\Phi(\\frac{${r} - ${mean}}{\\sqrt{${varValue}}}))\\)`;
            }
            else if(operator == '>') {
                answer = 1;
                var z = (r - mean) / stdDev;
                answer -= calculateProbability(z);

                answerEquationElement.textContent = `\\(p(X > ${r}) = 1 - p(X \\le ${r}) = \\Phi(\\frac{${r} - ${mean}}{\\sqrt{${varValue}}})\\)`;
            }
            else if(operator == '>=') {
                var z = (r - mean) / stdDev;
                answer = 1 - calculateProbability(z);

                answerEquationElement.textContent = `\\(p(X \\ge ${r}) = 1 - p(X \\le ${r}) = 1 - \\Phi(\\frac{${r} - ${mean}}{\\sqrt{${varValue}}})\\)`;
            }
            else if(operator == '<=') {
                var z = (r - mean) / stdDev;
                answer = calculateProbability(z);

                answerEquationElement.textContent = `\\(p(X \\le ${r}) = \\Phi(\\frac{${r} - ${mean}}{\\sqrt{${varValue}}})\\)`;
            }

            answer = truncateDecimals(answer, 6);
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

function calculateProbability(z) {
    const stdNormal = math.erf(z / Math.sqrt(2));
    const probability = (1 + stdNormal) / 2;
    return probability;
}
