
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  
  // Get the value of the 'city' parameter
  const city = params.get("city");
  
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    // Construct the URL using the config and the city parameter
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    // Parse the JSON data from the response
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error and return an empty array on failure
    console.error("Failed to fetch adventures:", error);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM


  const dataContainer = document.getElementById("data");

  // Clear existing content (e.g., if filtering)
  dataContainer.innerHTML = "";

  // Loop through each adventure in the list
  adventures.forEach((adventure) => {
    // Create the outer div for the Bootstrap column
    const adventureCard = document.createElement("div");
    // Set responsive classes: 4 on large, 2 on medium, 1 on small screens
    adventureCard.className = "col-lg-3 col-md-6 col-sm-12 mb-4";

    // Set the inner HTML for the card
    adventureCard.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="activity-card">
          <div class="category-banner">${adventure.category}</div>
          <img src="${adventure.image}" alt="${adventure.name}" class="activity-card img" />
          
          <div class="activity-card-text w-100 p-3">
            <div class="d-flex justify-content-between">
              <p class="card-title">${adventure.name}</p>
              <p>₹${adventure.costPerHead}</p>
            </div>
            <div classd-flex justify-content-between">
              <p class="card-text">Duration</p>
              <p>${adventure.duration} Hours</p>
            </div>
          </div>

        </div>
      </a>
    `;

    // Append the new card to the data container
    dataContainer.appendChild(adventureCard);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredList = list.filter(adventure => 
    adventure.duration >= low && adventure.duration <= high
  );
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(adventure => 
    categoryList.includes(adventure.category)
  );
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
filters=filters?filters:{ duration: "", category: [] };
console.log(JSON.stringify(list[0], null,200));
console.log(JSON.stringify(filters, null,200));
let filteredList = [...list];
  const hasDuration = filters.duration && filters.duration.length > 0;
  const hasCategory = filters.category && filters.category.length > 0;

  // Case 1: Filter by duration only
  if (hasDuration && !hasCategory) {
    const [low, high] = filters.duration.split("-").map(Number);
    filteredList = filterByDuration(list, low, high);
  }
  // Case 2: Filter by category only
  else if (!hasDuration && hasCategory) {
    filteredList = filterByCategory(list, filters.category);
  }
  // Case 3: Filter by both
  else if (hasDuration && hasCategory) {
    // First, filter by duration
    const [low, high] = filters.duration.split("-").map(Number);
    const durationFilteredList = filterByDuration(list, low, high);
    // Then, filter the result by category
    filteredList = filterByCategory(durationFilteredList, filters.category);
  }

console.log(JSON.stringify(filteredList[0], null,200));
  
  // Case 4 (Implicit): No filters applied, return the original list
  return filteredList;

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  // return true;
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  try {
    const filtersString = localStorage.getItem("filters");
    return JSON.parse(filtersString);
  } catch (error) {
    console.error("Could not get filters from localStorage:", error);
    return null;
  }
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if (filters.duration) {
    document.getElementById("duration-select").value = filters.duration;
  }

  // Generate Category Pills
  const categoryListContainer = document.getElementById("category-list");
  categoryListContainer.innerHTML = ""; // Clear existing pills

  filters.category.forEach(category => {
    const pill = document.createElement("div");
    pill.className = "category-filter";
    pill.innerText = category;
    categoryListContainer.appendChild(pill);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
