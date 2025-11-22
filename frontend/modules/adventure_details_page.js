import config from "../conf/index.js";

/*
creating fectch templates sample code.
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
*/
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  // Use URLSearchParams to easily parse the query string
  const params = new URLSearchParams(search);
  // The adventure ID is expected as the value for the 'adventure' key in the query params
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call


  // Place holder for functionality to work in the Stubs
  try {
    // Construct the URL using the config and the adventure ID parameter
    const url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
        // Throw an error or return null if the response status is not 2xx
        console.error(`HTTP error! Status: ${response.status}`);
        return null;
    }

    // Parse the JSON data from the response
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error and return null on failure (e.g., network error, server down)
    console.error("Failed to fetch adventure details:", error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  if (!adventure) {
    return;
  }

  // 1. Populate Name and Subtitle
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;

  // 2. Populate "About the Experience" Content
  document.getElementById("adventure-content").innerHTML = adventure.content;

  // 3. Populate Photo Gallery
  const photoGallery = document.getElementById("photo-gallery");
  
  adventure.images.forEach(imageUrl => {
    // Create a div element for the image row
    const divElement = document.createElement("div");
    // Add Bootstrap column class to ensure it takes full width in the row
    divElement.className = "col-lg-12 mb-3"; 
    
    // Create the image element
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = adventure.name;
    // Apply the required CSS class
    imgElement.className = "activity-card-image";

    // Append the image to the div, and the div to the gallery
    divElement.appendChild(imgElement);
    photoGallery.appendChild(divElement);
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  
  // Clear the existing content to replace it with the carousel
  photoGallery.innerHTML = "";

  // 1. Create the main carousel container
  const carousel = document.createElement("div");
  carousel.id = "carouselExampleIndicators";
  carousel.className = "carousel slide";
  carousel.setAttribute("data-bs-ride", "carousel");

  // 2. Create the carousel-inner container
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";

  // 3. Loop through images to create carousel-items
  images.forEach((imageUrl, index) => {
    const carouselItem = document.createElement("div");
    // The first item must be 'active'
    carouselItem.className = index === 0 ? "carousel-item active" : "carousel-item";

    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = `Adventure Image ${index + 1}`;
    // Use the required class for the image styling
    imgElement.className = "activity-card-image d-block w-100";

    carouselItem.appendChild(imgElement);
    carouselInner.appendChild(carouselItem);
  });

  // Append the carousel inner to the main carousel container
  carousel.appendChild(carouselInner);
  
  // 4. Add Carousel Controls (Previous/Next buttons)
  carousel.innerHTML += `
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;

  // 5. Append the complete carousel to the photo-gallery container
  photoGallery.appendChild(carousel);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  const availablePanel = document.getElementById("reservation-panel-available");
  const costPerHeadElement = document.getElementById("reservation-person-cost");
  
  if (adventure.available) {
    // Show reservation form, hide sold-out message
    soldOutPanel.style.display = "none";
    availablePanel.style.display = "block";

    // Update cost per head display
    costPerHeadElement.textContent = adventure.costPerHead;

  } else {
    // Hide reservation form, show sold-out message
    availablePanel.style.display = "none";
    soldOutPanel.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCostElement = document.getElementById("reservation-cost");
  
  // Ensure persons is a valid number, default to 0 if not
  const numPersons = parseInt(persons, 10);
  if (isNaN(numPersons) || numPersons < 0) {
      totalCostElement.textContent = 0;
      return;
  }
  
  // Calculate total cost (Cost Per Head * Number of Persons)
  const totalCost = adventure.costPerHead * numPersons;
  
  // Update the DOM element with the calculated total cost
  totalCostElement.textContent = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById("myForm");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Capture form data
    const data = {
        name: form.elements["name"].value,
        date: form.elements["date"].value,
        person: form.elements["person"].value,
        adventure: adventure.id,
    };

    // 2. Make POST API call
    try {
        const url = `${config.backendEndpoint}/reservations/new`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // 3. Success handling: Alert and refresh page
            alert("Success!");
            window.location.reload();
        } else {
            // 4. Failure handling: Alert
            const responseData = await response.json();
            alert(`Failed! Status: ${response.status}. Message: ${responseData.message || 'Unknown error.'}`);
        }
    } catch (error) {
        // Handle network/fetch errors
        console.error("Reservation request failed:", error);
        alert("Failed to connect to server!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");

  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
