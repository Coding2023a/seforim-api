// start json server with:  json-server --watch seforim.json

// Define an empty array to store seforim data
let seforimData = [];

// Get the element with class 'seforim-div'
const seforimDiv = document.querySelector('.seforim-div');

// Function to fetch seforim data from the server
async function fetchSeforim() {
    try {
        // Fetch seforim data from the server
        const response = await fetch('http://localhost:3000/seforim');
        // Parse the JSON response and store it in seforimData
        seforimData = await response.json();
        // Populate the category dropdown
        populateCategoryDropdown();
        // Display the seforim
        displaySeforim();
    } catch (error) {
        // If an error occurs, display an error message in seforimDiv
        seforimDiv.textContent = 'Error loading seforim: ' + error.message;
        console.error(error);
    }
}

// Function to display seforim in the seforimDiv
function displaySeforim() {
    // Clear existing content in seforimDiv
    seforimDiv.textContent = '';

    // Loop through each sefer in seforimData
    seforimData.forEach(sefer => {
        // Create a div element for the sefer
        const seferElement = document.createElement('div');
        seferElement.classList.add('sefer');

        // Create an h2 element for the title and set its text content
        const titleElement = document.createElement('h2');
        titleElement.textContent = sefer.title;
        seferElement.appendChild(titleElement);

        // Create a p element for the author and set its text content
        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${sefer.author}`;
        seferElement.appendChild(authorElement);

        // Create a p element for the category and set its text content
        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Category: ${sefer.category}`;
        seferElement.appendChild(categoryElement);

        // Append the seferElement to seforimDiv
        seforimDiv.appendChild(seferElement);
    });
}

// Function to filter seforim based on category and search query
function filterSeforim(categoryFilter, searchQuery) {
    return seforimData.filter(sefer =>
        (categoryFilter === 'All Categories' || sefer.category.toLowerCase().includes(categoryFilter.toLowerCase())) 
        &&
        (searchQuery === '' || sefer.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    );
}

// Function to populate the category dropdown
function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById('category-filter');
    categoryDropdown.textContent = '';

    const categories = ['All Categories', ...new Set(seforimData.map(sefer => sefer.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

// Function to handle changes in the category filter
function handleFilterChange() {
    const categoryFilter = document.getElementById('category-filter').value;
    const searchQuery = document.getElementById('search-query').value;
    const filteredSeforim = filterSeforim(categoryFilter, searchQuery);
    displayFilteredSeforim(filteredSeforim);
}

// Function to display filtered seforim
function displayFilteredSeforim(filteredSeforim) {
    seforimDiv.textContent = '';

    filteredSeforim.forEach(sefer => {
        const seferElement = document.createElement('div');
        seferElement.classList.add('sefer');

        const titleElement = document.createElement('h2');
        titleElement.textContent = sefer.title;
        seferElement.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${sefer.author}`;
        seferElement.appendChild(authorElement);

        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Category: ${sefer.category}`;
        seferElement.appendChild(categoryElement);

        seforimDiv.appendChild(seferElement);
    });
}

// Function to reset filters and display all seforim
function resetFilters() {
    document.getElementById('category-filter').value = 'All Categories';
    document.getElementById('search-query').value = '';
    displaySeforim();
}

// Fetch seforim data when the page loads
fetchSeforim();
