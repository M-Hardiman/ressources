// Convert degrees to radians and format the result
function degreesToRadians(degrees) {
    const radians = degrees * Math.PI / 180;
    // Format as fraction of π where possible
    if (degrees === 0) return "$0$";
    if (degrees === 180) return "$\\pi$";
    if (degrees === 90) return "$\\frac{\\pi}{2}$";
    if (degrees === 270) return "$\\frac{3\\pi}{2}$";
    if (degrees === 45) return "$\\frac{\\pi}{4}$";
    if (degrees === 135) return "$\\frac{3\\pi}{4}$";
    if (degrees === 225) return "$\\frac{5\\pi}{4}$";
    if (degrees === 315) return "$\\frac{7\\pi}{4}$";
    if (degrees === 30) return "$\\frac{\\pi}{6}$";
    if (degrees === 150) return "$\\frac{5\\pi}{6}$";
    if (degrees === 210) return "$\\frac{7\\pi}{6}$";
    if (degrees === 330) return "$\\frac{11\\pi}{6}$";
    if (degrees === 60) return "$\\frac{\\pi}{3}$";
    if (degrees === 120) return "$\\frac{2\\pi}{3}$";
    if (degrees === 240) return "$\\frac{4\\pi}{3}$";
    if (degrees === 300) return "$\\frac{5\\pi}{3}$";
    
    // For any other value, return decimal form
    return `$${radians.toFixed(2)}$`;
}

// Function to format degrees with MathJax
function formatDegrees(degrees) {
    return `$${degrees}^\\circ$`;
}

// Keep track of which labels are showing radians
const radianStates = new Set();

// Function to initialize click handlers
function initializeClickHandlers() {
    document.querySelectorAll('.angle-labels foreignObject div').forEach(div => {
        div.style.cursor = 'pointer';
        // Set initial degrees with MathJax formatting
        const degrees = parseInt(div.getAttribute('data-angle'));
        div.innerHTML = formatDegrees(degrees);
        
        div.addEventListener('click', function() {
            const degrees = parseInt(this.getAttribute('data-angle'));
            
            if (radianStates.has(degrees)) {
                // Switch back to degrees using MathJax
                this.innerHTML = formatDegrees(degrees);
                radianStates.delete(degrees);
            } else {
                // Switch to radians
                this.innerHTML = degreesToRadians(degrees);
                radianStates.add(degrees);
            }
            // Trigger MathJax to process the new content
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, this]);
        });
    });
}

// Initialize the click handlers once the SVG is loaded and trigger initial MathJax rendering
setTimeout(() => {
    initializeClickHandlers();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}, 100);
