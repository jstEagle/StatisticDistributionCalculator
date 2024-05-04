const buttonElement = document.getElementById('solve-button');
buttonElement.addEventListener('click', expectedValueCalc);
let myChart;

function expectedValueCalc() {
    const answerElement = document.querySelector('.answer');
    var meanField = document.getElementById('top-eq-input-1');
    var varField = document.getElementById('top-eq-input-2');
    

    // Use MathJax.typeset() to render LaTeX immediately
    MathJax.typeset();

    // Generate data for the normal distribution graph
    const data = [];
    const labels = [];
    const mean = parseFloat(meanField.value); // Mean of the normal distribution
    const stdDev = Math.sqrt(parseFloat(varField.value)); // Standard deviation of the normal distribution
    const numPoints = 100; // Number of points to generate

    for (let i = mean - (stdDev * 5); i <= mean + (stdDev * 5); i += 0.5) {
        labels.push(i.toFixed(1));
        data.push({
            x: i,
            y: Math.exp(-0.5 * Math.pow((i - mean) / stdDev, 2)) / (stdDev * Math.sqrt(2 * Math.PI))
        });
    }
    
    if(myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('Chart').getContext('2d');

    // Configure the chart options
    const chartOptions = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Normal Distribution',
                data: data,
                borderColor: 'rgba(0, 128, 0, 1)',
                backgroundColor: 'rgba(0, 128, 0, 0.5)',
                borderWidth: 1,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Probability Density'
                    }
                }
            }
        }
    };

    // Create the chart
    myChart = new Chart(ctx, chartOptions);

    answerElement.style.display = 'block';
}