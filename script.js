const venues = [
  "Qatar",
  "Portugal",
  "America",
  "Spanish",
  "French",
  "Catalan",
  "Italian",
  "Dutch",
  "German",
  "British",
  "Austrian",
  "Aragon",
  "San Marino",
  "Emilia-Romagna",
  "Indonesia",
  "Japanese",
  "Australian",
  "Thailand",
  "Malaysian",
  "Valencia",
];

const points = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let players = {};
let scores = {};
let currentVenue = "";

function showEnterNames() {
  document.querySelector(".splash-screen").classList.remove("active");
  document.querySelector(".enter-names").classList.add("active");
}

function startGame() {
  const player1 = document.getElementById("player1").value || "Player 1";
  const player2 = document.getElementById("player2").value || "Player 2";

  players = { player1, player2 };
  scores = { [player1]: 0, [player2]: 0 };

  document.getElementById("modal-player1-name").innerText = player1;
  document.getElementById("modal-player2-name").innerText = player2;

  document.querySelector(".enter-names").classList.remove("active");
  document.querySelector(".venues").classList.add("active");

  loadVenues();
  updateScoreboard();
}

function loadVenues() {
  const venueList = document.querySelector(".venue-list");
  venueList.innerHTML = "";
  venues.forEach((venue) => {
    const li = document.createElement("li");
    li.innerText = venue;
    li.classList.add("list-group-item", "list-group-item-action");
    li.addEventListener("click", () => selectVenue(venue));
    venueList.appendChild(li);
  });
}

function selectVenue(venue) {
  currentVenue = venue;
  document.getElementById("modal-venue-name").innerText = venue;
  $("#resultModal").modal("show"); // Show the modal using jQuery
}

function submitResults() {
  const result1 = parseInt(document.getElementById("modal-result1").value, 10);
  const result2 = parseInt(document.getElementById("modal-result2").value, 10);

  if (result1 >= 1 && result1 <= 15) {
    scores[players.player1] += points[result1 - 1];
  }
  if (result2 >= 1 && result2 <= 15) {
    scores[players.player2] += points[result2 - 1];
  }

  $("#resultModal").modal("hide"); // Hide the modal

  const venueItem = Array.from(
    document.querySelectorAll(".venue-list li")
  ).find((li) => li.innerText === currentVenue);
  if (venueItem) {
    venueItem.classList.add("completed");
    venueItem.classList.remove("list-group-item-action");
    venueItem.classList.add("list-group-item-secondary");
  }

  updateScoreboard();
}

function updateScoreboard() {
  const scoreboard = document.getElementById("scoreboard");
  const difference = scores[players.player1] - scores[players.player2];
  scoreboard.innerHTML = `
      <strong>${players.player1}:</strong> ${scores[players.player1]} points<br>
      <strong>${players.player2}:</strong> ${scores[players.player2]} points<br>
      <strong>Difference:</strong> ${Math.abs(difference)} points
  `;
}
