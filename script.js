// Fetch trail data from a JSON file or API
async function fetchTrails() {
    try {
        // Replace with your JSON file URL (e.g., hosted in another GitHub repo)
        const response = await fetch('https://jhds-creations.github.io/trail-data/trails.json');
        const trails = await response.json();
        return trails;
    } catch (error) {
        console.error('Error fetching trails:', error);
        return [];
    }
}

// Display trails on the page
function displayTrails(trails) {
    const trailList = document.getElementById('trail-list');
    trailList.innerHTML = ''; // Clear existing content

    trails.forEach(trail => {
        const trailCard = document.createElement('div');
        trailCard.className = 'trail-card';
        trailCard.innerHTML = `
            <h3>${trail.name}</h3>
            <p><strong>Description:</strong> ${trail.description}</p>
            <p><strong>Length:</strong> ${trail.length} km</p>
            <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
            <p><strong>Location:</strong> ${trail.location}</p>
        `;
        trailList.appendChild(trailCard);
    });
}

// Filter trails by difficulty
function filterTrails(trails, difficulty) {
    if (difficulty === 'all') return trails;
    return trails.filter(trail => trail.difficulty === difficulty);
}

// Initialize the page
async function init() {
    const trails = await fetchTrails();
    displayTrails(trails);

    // Set up filter event listener
    const difficultyFilter = document.getElementById('difficulty-filter');
    difficultyFilter.addEventListener('change', async () => {
        const filteredTrails = filterTrails(trails, difficultyFilter.value);
        displayTrails(filteredTrails);
    });
}

// Run initialization
init();