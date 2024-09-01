// Ensure stratagems_data.js is loaded before running the pickStratagems function

// Function to pick and display stratagems for 4 players
function pickStratagems() {
    const exclusiveAttributes = ["backpack", "support", "mines", "exo"];
    const stratagemPicks = [];
    const usedStratagems = new Set(); // Track used stratagems to avoid duplicates

    for (let player = 0; player < 4; player++) {
        const selectedStratagems = [];

        for (let i = 0; i < 3; i++) {
            let validPick = false;
            while (!validPick) {
                const keys = Object.keys(stratagems);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                const attributes = stratagems[randomKey];

                const conflicts = selectedStratagems.some(s => {
                    return stratagems[s].some(attr => exclusiveAttributes.includes(attr) && attributes.includes(attr));
                });

                if (!conflicts && !usedStratagems.has(randomKey)) { // Ensure no duplicates
                    selectedStratagems.push(randomKey);
                    usedStratagems.add(randomKey); // Mark this stratagem as used
                    validPick = true;
                }
            }
        }

        // Sort by color attributes (red, blue, green)
        selectedStratagems.sort((a, b) => {
            const colorOrder = ["red", "blue", "green"];
            const aColor = stratagems[a].find(attr => colorOrder.includes(attr)) || "";
            const bColor = stratagems[b].find(attr => colorOrder.includes(attr)) || "";
            return colorOrder.indexOf(aColor) - colorOrder.indexOf(bColor);
        });

        stratagemPicks.push(selectedStratagems);
    }

    // Display the stratagems with player labels
    const grid = document.getElementById('stratagem-grid');
    grid.innerHTML = ''; // Clear previous results
    stratagemPicks.forEach((playerPicks, index) => {
        // Create player label
        const playerLabel = document.createElement('div');
        playerLabel.textContent = `Player ${index + 1}`;
        playerLabel.style.gridColumn = "span 3";
        playerLabel.style.fontWeight = "bold";
        playerLabel.style.marginBottom = "10px";
        grid.appendChild(playerLabel);

        // Display the stratagems
        playerPicks.forEach(strat => {
            const img = document.createElement('img');
            img.src = `stratagems/${strat}.webp`;
            img.alt = strat;
            grid.appendChild(img);
        });
    });
}
