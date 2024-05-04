const inputElement = document.getElementById('eq');
const answerEquationElement = document.getElementById('equation-answer');
const numberAnswerElement = document.getElementById('number-answer');

inputElement.addEventListener('input', function() {
    if(this.value.trim() !== '') {
        const equationString = this.value.trim();
        const pattern = /x\s*(<=|>=|=|<|>)\s*(\d+)/i;

        const match = pattern.exec(equationString);
        var numberField = document.getElementById('top-eq-input-1');
        const n = parseFloat(numberField.value);

        var probField = document.getElementById('top-eq-input-2');
        const p = parseFloat(probField.value);
        const q = 1-p;

        if(match) {
            var answer = 0;
            const operator = match[1];
            const r = parseInt(match[2]);

            if(operator == '=') {
                answer = combination(n, r) * (p**r) * (q**(n-r));
                answerEquationElement.textContent = `\\(p(X=${r}) = \\begin{pmatrix} ${n} \\\\ ${r} \\end{pmatrix} * ${p}^{${r}} * ${q}^{${n} - ${r}} \\)`
            }
            else if(operator == '<') {
                if(r < n/2) {
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X<${r}) = `
                    for(var i = 0; i < r; i++) {
                        answer += combination(n, i) * (p**i) * (q**(n-i));
                        if(i == r-1) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}}\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    }
                }
                else {
                    answer = 1;
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X\\ge${r}) = 1 - (`
                    for(var i = r; i <= n; i++) {
                        answer -= combination(n, i) * (p**i) * (q**(n-i));
                        if(i == n) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}})\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    } 
                }
                
            }
            else if(operator == '>') {
                if(r < n/2) {
                    answer = 1;
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X\\le${r}) = 1 - (`
                    for(var i = 0; i <= r; i++) {
                        answer -= combination(n, i) * (p**i) * (q**(n-i));
                        if(i == r) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}})\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    } 
                } else {
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X>${r}) = `
                    for(var i = r+1; i <= n; i++) {
                        answer += combination(n, i) * (p**i) * (q**(n-i));
                        if(i == n) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}}\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    } 
                }
            }
            else if(operator == '>=') {
                if(r < n/2) {
                    answer = 1;
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X<${r}) = 1 - (`
                    for(var i = 0; i < r; i++) {
                        answer -= combination(n, i) * (p**i) * (q**(n-i));
                        if(i == r-1) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}})\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    }
                }
                else {
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X\\ge${r}) = `
                    for(var i = r; i <= n; i++) {
                        answer += combination(n, i) * (p**i) * (q**(n-i));
                        if(i == n) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}}\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    }
                }
            }
            else if(operator == '<=') {
                if(r < n/2) {
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X\\le${r}) = `
                    for(var i = 0; i <= r; i++) {
                        answer += combination(n, i) * (p**i) * (q**(n-i));
                        if(i == r) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}}\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    } 
                }
                else {
                    answer = 1;
                    answerEquationElement.textContent = '';
                    answerEquationElement.textContent += `\\(p(X>${r}) = 1 - (`
                    for(var i = r+1; i <= n; i++) {
                        answer -= combination(n, i) * (p**i) * (q**(n-i));
                        if(i == n) {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}})\\)`;

                        }
                        else {
                            answerEquationElement.textContent += `\\begin{pmatrix} ${n} \\\\ ${i}\\end{pmatrix}(p)^{${i}}(q)^{${n}-${i}} + `;
                        }
                    } 
                }
                
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

function factorial(num) {
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

function combination(n, r) {
    // Calculate the combination using the factorial function
    const numerator = factorial(n);
    const denominator = factorial(r) * factorial(n - r);

    return numerator / denominator;
}