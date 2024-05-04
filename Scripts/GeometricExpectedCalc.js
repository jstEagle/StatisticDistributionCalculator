const buttonElement = document.getElementById('solve-button');
buttonElement.addEventListener('click', expectedValueCalc);
let myChart;

function expectedValueCalc() {
    const answerElement = document.querySelector('.answer');
    var inputField = document.getElementById('top-eq-input');
    var inputValue = parseFloat(inputField.value);

    var expectedValueField = document.getElementById('expected-value');
    expectedValueField.textContent = '\\(E(x) = ' + (1 / inputValue) + '\\)';

    var medianValueField = document.getElementById('median-value');
    var lowestVal = -1 * (Math.log(2) / Math.log(1 - inputValue));
    var highestVal = 1 - (Math.log(2) / Math.log(1 - inputValue));
    var median = -1;

    for (var i = Math.ceil(lowestVal); i <= highestVal; i++) {
        if (i <= highestVal && i >= lowestVal) {
            median = i;
            break;
        }
    }

    medianValueField.textContent = '\\(Median\\ = ' + median + '\\)';

    // Use MathJax.typeset() to render LaTeX immediately
    MathJax.typeset();

    var dataTable = [];
    var p = inputValue;
    var q = 1 - inputValue;

    for(var i = 1; i <= 12; i++) {
        dataTable.push(p * (q ** (i - 1)));
    }
    
    if(myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('barChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [{
                    label: `X ~ Geo(${p})`,
                    data: dataTable,
                    backgroundColor: 'rgba(128, 0, 128, 0.5)',
                    borderColor: 'rgba(128, 0, 128, 1)',
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