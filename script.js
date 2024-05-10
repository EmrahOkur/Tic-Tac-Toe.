let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init(){
    render();
}


function render() {
    let table = "<table>";
    for (let i = 0; i < 3; i++) {
        table += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] ? (fields[index] === 'circle' ? generateCircleSVG() : generateCrossSVG()) : '';
            table += `<td id="cell${index}" onclick="handleClick(${index})">${symbol}</td>`;
        }
        table += "</tr>";
    }
    table += "</table>";
    document.getElementById("content").innerHTML = table;
}

function restartGame(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render();
}

function handleClick(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        document.getElementById(`cell${index}`).innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechseln Sie den Spieler
        checkGameStatus();
    }
}

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];


    function handleClick(index) {
        if (fields[index] === null) {
            fields[index] = currentPlayer;
            document.getElementById(`cell${index}`).innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechseln Sie den Spieler
            if (isGameFinished()) {
                const winCombination = getWinningCombination();
                drawWinningLine(winCombination);
            
            }
        }
    }
    
    function isGameFinished() {
        return fields.every((field) => field !== null) || getWinningCombination() !== null;
    }
    
    function getWinningCombination() {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
                return WINNING_COMBINATIONS[i];
            }
        }
        return null;
    }
    function drawWinningLine(combination) {
        const lineColor = '#ffffff';
        const lineWidth = 5;
    
        const startCell = document.querySelectorAll(`td`)[combination[0]];
        const endCell = document.querySelectorAll(`td`)[combination[2]];
        const startRect = startCell.getBoundingClientRect();
        const endRect = endCell.getBoundingClientRect();
    
        const lineLength = Math.sqrt(
            Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
        );
        const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
    
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.width = `${lineLength}px`;
        line.style.height = `${lineWidth}px`;
        line.style.backgroundColor = lineColor;
        line.style.top = `${ startRect.top + startRect.height / 2 - lineWidth / 2 }px`;
        line.style.left = `${ startRect.left + startRect.width / 2 }px`;
        line.style.transform = `rotate(${ lineAngle }rad)`;
        line.style.transformOrigin = `top left`;
        document.getElementById('content').appendChild(line);
    }

function generateCircleSVG() {
    const circleColor = "#00B0EF";
    const width = 70;
    const height = 70;

    const svgCode = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 1}" fill="none" stroke="${circleColor}" stroke-width="2">
                <animate attributeName="stroke-dasharray" values="0,500;500,500" dur="200ms" repeatCount="1" fill="freeze" />
                <animate attributeName="stroke" values="transparent;${circleColor}" dur="200ms" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

const circleSVG = generateCircleSVG();
console.log(circleSVG); // Du kannst es in deiner HTML-Seite verwenden oder für andere Zwecke nutzen.

function generateCrossSVG() {
    const crossColor = "#FFC000";
    const size = 70;

    const svgCode = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="${size}" x2="${size}" y2="0" stroke="${crossColor}" stroke-width="4">
                <animate attributeName="stroke-dashoffset" values="140; 0" dur="200ms" fill="freeze" />
            </line>
            <line x1="${size}" y1="${size}" x2="0" y2="0" stroke="${crossColor}" stroke-width="4">
                <animate attributeName="stroke-dashoffset" values="140; 0" dur="200ms" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}

const crossSVG = generateCrossSVG();
console.log(crossSVG);
