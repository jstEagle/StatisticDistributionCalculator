const zValueInput = document.getElementById('top-eq-input-1');
const pValueInput = document.getElementById('top-eq-input-2');

zValueInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        pValueInput.value = null;
        const zValue = parseFloat(zValueInput.value.trim());
        const prob = calculateProbability(zValue);
        pValueInput.value = truncateDecimals(prob, 4);
    }
});

pValueInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        zValueInput.value = null;
        const pValue = parseFloat(pValueInput.value.trim());
        const z = calculateZ(pValue);
        zValueInput.value = truncateDecimals(z, 4);
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

function calculateZ(probability) {
    // Check if probability is valid (between 0 and 1)
    if (probability <= 0 || probability >= 1) {
        throw new Error('Probability must be between 0 and 1.');
    }

    // Define constants for approximation
    const c0 = 2.515517;
    const c1 = 0.802853;
    const c2 = 0.010328;
    const d1 = 1.432788;
    const d2 = 0.189269;
    const d3 = 0.001308;

    // Calculate t-value using approximation formula
    const t = Math.sqrt(-2 * Math.log(1 - probability));
    const z = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t);

    // Return the calculated z-value
    return z;
}