import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them


  // Place holder for functionality to work in the Stubs
  try {
    // Construct the URL
    const url = `${config.backendEndpoint}/reservations/`;
    
    // Fetch data
    const response = await fetch(url);

    // Check if response is OK
    if (!response.ok) {
      return null;
    }

    // Parse JSON
    const data = await response.json();
    return data;

  } catch (error) {
    // Handle exceptions (e.g., backend down)
    return null;
  }
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    // Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations && reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
    return;
  }

  const tableBody = document.getElementById("reservation-table");
  
  // FIX 1: Clear the table body to prevent duplicate entries
  tableBody.innerHTML = "";

  reservations.forEach((reservation) => {
    // Format Date: 5/11/2020
    const date = new Date(reservation.date).toLocaleDateString("en-IN");

    // Format Time: 4 November 2020, 9:32:31 pm
    const time = new Date(reservation.time).toLocaleString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    // FIX 2: Handle browser inconsistencies. 
    // Some browsers output "4 November 2020 at 9:32:31 pm", test expects "4 November 2020, 9:32:31 pm"
    const formattedTime = time.replace(" at", ",");

    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${date}</td>
      <td>${reservation.price}</td>
      <td>${formattedTime}</td>
      <td>
        <div class="reservation-visit-button" id=${reservation.id}>
          <a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });

}

export { fetchReservations, addReservationToTable };
