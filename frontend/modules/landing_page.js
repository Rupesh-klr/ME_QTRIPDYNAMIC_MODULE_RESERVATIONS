import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities
    );

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch cities:", error);
    // Return an empty array on error to prevent the .forEach() from crashing
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataContainer = document.getElementById("data");
  
  // Create a new div element that will act as the Bootstrap column
  const cardElement = document.createElement("div");
  
  // Add the responsive column classes for 4, 2, and 1 cards per row
  cardElement.className = "col-lg-3 col-md-6 col-sm-12 mb-4";
  
  // Set the inner HTML of the card element
  cardElement.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <img src="${image}" alt="${city}" />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  
  // Append the new card element to the parent container
  dataContainer.appendChild(cardElement);

}

export { init, fetchCities, addCityToDOM };
