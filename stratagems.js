// Ensure stratagems_data.js is loaded before running the pickStratagems function

// Function to pick and display stratagems for 4 players
function pickStratagems() {
    const exclusiveAttributes = ["backpack", "support", "mines", "exo"];
    const stratagemPicks = [];
    const usedStratagems = new Set(); // Track used stratagems to avoid duplicates

    // Player colors
    const playerColors = [
        "#fca94d", // Player 1
        "#9abafa", // Player 2
        "#fa9af9", // Player 3
        "#84e166"  // Player 4
    ];

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

    // Display the stratagems with player labels and an "ANY" slot
    const grid = document.getElementById('stratagem-grid');
    grid.innerHTML = ''; // Clear previous results
    stratagemPicks.forEach((playerPicks, index) => {
        // Create a container for each player's picks
        const playerContainer = document.createElement('div');
        playerContainer.classList.add('player-container');
        playerContainer.style.borderColor = playerColors[index]; // Apply player-specific border color

        // Create player label
        const playerLabel = document.createElement('div');
        playerLabel.textContent = `Player ${index + 1}`;
        playerLabel.style.gridColumn = "span 4";
        playerLabel.style.fontWeight = "bold";
        playerLabel.style.color = playerColors[index]; // Apply player-specific color
        playerContainer.appendChild(playerLabel);

        // Display the stratagems
        playerPicks.forEach(strat => {
            const img = document.createElement('img');
            img.src = `stratagems/${strat}.webp`;
            img.alt = strat;
            playerContainer.appendChild(img);
        });

        // Add an "ANY" slot using an image
        const anyImg = document.createElement('img');
        anyImg.src = `stratagems/any_slot.png`; // Path to your ANY image
        anyImg.alt = "ANY";
        playerContainer.appendChild(anyImg);

        // Append the player's container to the grid
        grid.appendChild(playerContainer);
    });
}
