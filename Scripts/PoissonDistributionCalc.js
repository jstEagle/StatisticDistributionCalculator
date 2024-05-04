const inputElement = document.getElementById('eq');
const answerEquationElement = document.getElementById('equation-answer');
const numberAnswerElement = document.getElementById('number-answer');

inputElement.addEventListener('input', function() {
    if(this.value.trim() !== '') {
        const equationString = this.value.trim();
        const pattern = /x\s*(<=|>=|=|<|>)\s*(\d+)/i;

        const match = pattern.exec(equationString);
        var lambdaField = document.getElementById('top-eq-input');
        const lamb = parseFloat(lambdaField.value);

        if(match) {
            var answer = 0;
            const operator = match[1];
            const x = parseInt(match[2]);

            if(operator == '=') {
                answer = (Math.exp(-1 * lamb) * (lamb ** x)) / factorial(x);
                answerEquationElement.textContent = `\\(p(X=${x}) = \\frac{e^{-${lamb}} * ${lamb}^${x}}{${x}!} \\)`;
            }
            else if(operator == '<') {
                answerEquationElement.textContent = '';
                answerEquationElement.textContent += `\\(p(X<${x}) = e^{-${lamb}}(`;
                for(var i = 0; i < x; i++) {
                    answer += (Math.exp(-1 * lamb) * (lamb ** i)) / factorial(i);
                    if(i == 0) {
                        if(i == x-1) {
                            answerEquationElement.textContent = `\\(p(X<${lamb}) = \\frac{e^{-${lamb}} * ${lamb}^{${x}}}{${x}!}`;
                        }
                        else {
                            answerEquationElement.textContent += '1 + ';
                        }
                    }
                    else if(i == 1) {
                        if(i == x-1) {
                            answerEquationElement.textContent += `${lamb})`;
                        }
                        else {
                            answerEquationElement.textContent += `${lamb} + `;
                        }
                    }
                    else {
                        if(i == x-1) {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!})`;
                        }
                        else {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!} + `;
                        }
                    }
                }
                answerEquationElement.textContent += '\\)';
            }
            else if(operator == '>') {
                answer = 1;
                answerEquationElement.textContent = '';
                answerEquationElement.textContent += `\\(p(X>${x}) =1 - e^{-${lamb}}(`;
                for(var i = 0; i <= x; i++) {
                    answer -= (Math.exp(-1 * lamb) * (lamb ** i)) / factorial(i);
                    if(i == 0) {
                        if(i == x) {
                            answerEquationElement.textContent = `\\(p(X>${lamb}) = \\frac{e^{-${lamb}} * ${lamb}^{${x}}}{${x}!}`;
                        }
                        else {
                            answerEquationElement.textContent += '1 + ';
                        }
                    }
                    else if(i == 1) {
                        if(i == x) {
                            answerEquationElement.textContent += `${lamb})`;
                        }
                        else {
                            answerEquationElement.textContent += `${lamb} + `;
                        }
                    }
                    else {
                        if(i == x) {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!})`;
                        }
                        else {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!} + `;
                        }
                    }
                }
                answerEquationElement.textContent += '\\)';
            }
            else if(operator == '>=') {
                answer = 1;
                answerEquationElement.textContent = '';
                answerEquationElement.textContent += `\\(p(X\\ge${x}) =1 - e^{-${lamb}}(`;
                for(var i = 0; i < x; i++) {
                    answer -= (Math.exp(-1 * lamb) * (lamb ** i)) / factorial(i);
                    if(i == 0) {
                        if(i == x-1) {
                            answerEquationElement.textContent = `\\(p(X\\ge${lamb}) = \\frac{e^{-${lamb}} * ${lamb}^{${x}}}{${x}!}`;
                        }
                        else {
                            answerEquationElement.textContent += '1 + ';
                        }
                    }
                    else if(i == 1) {
                        if(i == x-1) {
                            answerEquationElement.textContent += `${lamb})`;
                        }
                        else {
                            answerEquationElement.textContent += `${lamb} + `;
                        }
                    }
                    else {
                        if(i == x-1) {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!})`;
                        }
                        else {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!} + `;
                        }
                    }
                }
                answerEquationElement.textContent += '\\)';
            }
            else if(operator == '<=') {
                answerEquationElement.textContent = '';
                answerEquationElement.textContent += `\\(p(X\\le${x}) = e^{-${lamb}}(`;
                for(var i = 0; i <= x; i++) {
                    answer += (Math.exp(-1 * lamb) * (lamb ** i)) / factorial(i);
                    if(i == 0) {
                        if(i == x) {
                            answerEquationElement.textContent = `\\(p(X\\le${lamb}) = \\frac{e^{-${lamb}} * ${lamb}^{${x}}}{${x}!}`;
                        }
                        else {
                            answerEquationElement.textContent += '1 + ';
                        }
                    }
                    else if(i == 1) {
                        if(i == x) {
                            answerEquationElement.textContent += `${lamb})`;
                        }
                        else {
                            answerEquationElement.textContent += `${lamb} + `;
                        }
                    }
                    else {
                        if(i == x) {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!})`;
                        }
                        else {
                            answerEquationElement.textContent += `\\frac{${lamb}^{${i}}}{${i}!} + `;
                        }
                    }
                }
                answerEquationElement.textContent += '\\)';
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

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}