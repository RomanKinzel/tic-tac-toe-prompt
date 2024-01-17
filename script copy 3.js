let fields = [
    'circle',
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

function init() {
     render();     // Call render to initially render the table
}

function render() {
    const container = document.getElementById('content'); // Document mit content wird geholt
    const table = document.createElement('table');
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr'); // 3 Zeile werden erstellt
        for (let j = 0; j < 3; j++) {
          const cell = document.createElement('td'); // 3 Felder werden erstellt
          cell.classList.add('hover-cell'); // CSS-Klasse für Hover-Effekt über td
          const index = i * 3 + j; // jeweilige Zeile x 3 um den Index zu bekommen
          const fieldValue = fields[index]; // index vom Array

          if (fieldValue === 'circle') { // wenn "circle" im Array steht, soll es ein O sein
            const svgElement = generateCircleSVG();
            cell.appendChild(svgElement);
          } else if (fieldValue === 'cross') { // wenn "cross" im Array steht, soll es ein X sein
            cell.innerHTML = generateCrossSVG();   
          } else {
            // Füge die onclick-Funktion hinzu, wenn das Feld leer ist
            cell.onclick = function() {
                handleClick(cell, index);
            };
        }

          row.appendChild(cell); //fügt die Zelle (cell) als Kind zum Zeilen-Element (row) hinzu.
        }
        table.appendChild(row); // Nachdem die innerste Schleife durchlaufen wurde (die Zellen einer Zeile erstellt und hinzugefügt wurden), wird die gesamte Zeile (row) mit der Zeile table.appendChild(row); als eine Zeile in der Tabelle hinzugefügt. Dieser Vorgang wird für jede Zeile wiederholt, sodass am Ende alle Zeilen (mit allen Zellen) zur Tabelle hinzugefügt wurden.
                                //Insgesamt wird die Tabelle schrittweise aufgebaut, indem Zellen zu Zeilen und Zeilen zur Tabelle hinzugefügt werden, und schließlich wird die Tabelle im HTML-Dokument dargestellt.
      }

      container.innerHTML = '';
      container.appendChild(table);
}

function handleClick(cell, index) {
    // Abwechselnd 'circle' oder 'cross' in das Array einfügen
    fields[index] = (fields[index] === 'cross') ? 'cross' : 'circle';

    // HTML-Code von generateCircleSVG() oder generateCrossSVG() einfügen
    if (fields[index] === 'circle') {
        const svgElement = generateCircleSVG();
        cell.appendChild(svgElement);
    } else if (fields[index] === 'cross') {
        cell.innerHTML = generateCrossSVG();
    }

    // onclick-Funktion vom Zellelement entfernen
    cell.onclick = function() {
        // Wenn auf eine bereits geklickte Zelle erneut geklickt wird, soll nichts passieren
    };
}
init();

   
// Funktion zum Generieren eines SVG-Kreises mit Animation
function generateCircleSVG() {
    // SVG-Namespace für die Verwendung von createElementNS
    const svgNamespace = 'http://www.w3.org/2000/svg';

    // Erstelle ein SVG-Element
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('width', '70'); // Setze die Breite des SVG-Elements
    svgElement.setAttribute('height', '70'); // Setze die Höhe des SVG-Elements

    // Erstelle ein Kreiselement innerhalb des SVGs
    const circleElement = document.createElementNS(svgNamespace, 'circle');
    circleElement.setAttribute('cx', '35'); // x-Koordinate des Kreismittelpunkts
    circleElement.setAttribute('cy', '35'); // y-Koordinate des Kreismittelpunkts
    circleElement.setAttribute('r', '30'); // Radius des Kreises
    circleElement.setAttribute('fill', '#00B0EF'); // Füllfarbe des Kreises
    circleElement.setAttribute('stroke', '#00B0EF'); // Farbe des Kreisrands
    circleElement.setAttribute('stroke-width', '5'); // Breite des Kreisrands
    circleElement.setAttribute('stroke-dasharray', '0 188.5'); // Muster für die Kreisrandanimation

    // Erstelle ein Animationslement für die Kreisrandanimation
    const animateElement = document.createElementNS(svgNamespace, 'animate');
    animateElement.setAttribute('attributeName', 'stroke-dasharray'); // Animation für stroke-dasharray
    animateElement.setAttribute('values', '0 188.5; 188.5 0'); // Animation von leer zu gefüllt
    animateElement.setAttribute('dur', '2s'); // Dauer der Animation in Sekunden
    animateElement.setAttribute('repeatCount', '1'); // Wiederhole die Animation nur einmal

    // Füge das Kreiselement und die Animation zum SVG-Element hinzu
    svgElement.appendChild(circleElement);
    circleElement.appendChild(animateElement);

    // Gib das vollständige SVG-Element zurück
    return svgElement;
  }
        
  
    // Füge das generierte SVG-Element zum Container hinzu
    //   const svgContainer = document.getElementById('svg-container');
    //   svgContainer.appendChild(generateCircleSVG());


    // Funktion zum Generieren von SVG-Code für ein Kreuz
function generateCrossSVG() {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('width', '70');
    svgElement.setAttribute('height', '70');
  
    // Erste Linie des Kreuzes
    const line1 = document.createElementNS(svgNamespace, 'line');
    line1.setAttribute('x1', '10');
    line1.setAttribute('y1', '10');
    line1.setAttribute('x2', '60');
    line1.setAttribute('y2', '60');
    line1.setAttribute('stroke', '#FFC000');
    line1.setAttribute('stroke-width', '5');
    line1.setAttribute('stroke-dasharray', '0 74'); // Startet mit einer leeren Linie
  
    // Zweite Linie des Kreuzes
    const line2 = document.createElementNS(svgNamespace, 'line');
    line2.setAttribute('x1', '60');
    line2.setAttribute('y1', '10');
    line2.setAttribute('x2', '10');
    line2.setAttribute('y2', '60');
    line2.setAttribute('stroke', '#FFC000');
    line2.setAttribute('stroke-width', '5');
    line2.setAttribute('stroke-dasharray', '0 74'); // Startet mit einer leeren Linie
  
    // Füge die Animationsattribute für die erste Linie hinzu
    const animateLine1 = document.createElementNS(svgNamespace, 'animate');
    animateLine1.setAttribute('attributeName', 'stroke-dasharray');
    animateLine1.setAttribute('values', '0 74; 74 0'); // Ändert die Werte, um die Linie zu füllen
    animateLine1.setAttribute('dur', '2s'); // Dauer der Animation in Sekunden
    animateLine1.setAttribute('repeatCount', 'indefinite'); // Wiederhole die Animation unendlich oft
  
    // Füge die Animationsattribute für die zweite Linie hinzu
    const animateLine2 = document.createElementNS(svgNamespace, 'animate');
    animateLine2.setAttribute('attributeName', 'stroke-dasharray');
    animateLine2.setAttribute('values', '0 74; 74 0'); // Ändert die Werte, um die Linie zu füllen
    animateLine2.setAttribute('dur', '2s'); // Dauer der Animation in Sekunden
    animateLine2.setAttribute('repeatCount', 'indefinite'); // Wiederhole die Animation unendlich oft
  
    // Füge die Linien und Animationen zum SVG-Element hinzu
    svgElement.appendChild(line1);
    line1.appendChild(animateLine1);
  
    svgElement.appendChild(line2);
    line2.appendChild(animateLine2);
  
    // Gib den vollständigen SVG-Code zurück
    return svgElement.outerHTML;
  }
  // Beispiel: Füge das generierte SVG-Element zum Body hinzu
// document.body.innerHTML = generateCrossSVG();