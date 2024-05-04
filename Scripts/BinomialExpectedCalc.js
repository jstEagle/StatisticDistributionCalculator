const buttonElement = document.getElementById('solve-button');
buttonElement.addEventListener('click', expectedValueCalc);
let myChart;

function expectedValueCalc() {
    const answerElement = document.querySelector('.answer');
    var numberField = document.getElementById('top-eq-input-1');
    var probField = document.getElementById('top-eq-input-2');
    var n = parseFloat(numberField.value);
    var p = parseFloat(probField.value);
    var q = 1-p;

    var expectedValueField = document.getElementById('expected-value');
    expectedValueField.textContent = '\\(E(x) = ' + (n * p) + '\\)';
    
    var varValueField = document.getElementById('var-value');
    varValueField.textContent = '\\(Var(x) = ' + (n * p * q) + '\\)';

    // Use MathJax.typeset() to render LaTeX immediately
    MathJax.typeset();

    var dataTable = [];

    var labelsTable = [];

    for(var i = 0; i <= n; i++) {
        dataTable.push(combination(n, i) * (p**i) * (q**(n-i)));
        labelsTable.push(`${i}`);
    }
    
    if(myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('barChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelsTable,
                datasets: [{
                    label: `X ~ B(${n}, ${p})`,
                    data: dataTable,
                    backgroundColor: 'rgba(232, 18, 18, 0.5)',
                    borderColor: 'rgba(232, 18, 18, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    answerElement.style.display = 'block';
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