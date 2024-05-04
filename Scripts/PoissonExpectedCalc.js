const buttonElement = document.getElementById('solve-button');
buttonElement.addEventListener('click', expectedValueCalc);
let myChart;

function expectedValueCalc() {
    const answerElement = document.querySelector('.answer');
    var inputField = document.getElementById('top-eq-input');
    var inputValue = parseFloat(inputField.value);

    var expectedValueField = document.getElementById('expected-value');
    expectedValueField.textContent = '\\(E(x) = ' + (inputValue) + '\\)';
    
    var varValueField = document.getElementById('var-value');
    varValueField.textContent = '\\(Var(x) = ' + (inputValue) + '\\)';

    // Use MathJax.typeset() to render LaTeX immediately
    MathJax.typeset();

    var dataTable = [];
    var lamb = inputValue;

    for(var i = 0; i <= 12; i++) {
        dataTable.push((Math.exp(-1 * lamb) * (lamb ** i)) / factorial(i));
    }
    
    if(myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('barChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [{
                    label: `X ~ Po(${lamb})`,
                    data: dataTable,
                    backgroundColor: 'rgba(63, 133, 204, 0.5)',
                    borderColor: 'rgba(63, 133, 204, 1)',
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

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}