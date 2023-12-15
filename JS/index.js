import { token } from "./token.js";

// Array of music genres
const genres = ["Rock", "Pop", "Jazz", "Hip Hop", "Classical", "Electronic", "Reggae", "Country", "Blues", "Metal"];

// Array of phrases for playlists
const phrases = ["In the Mood for", "All-Time Best", "Feeling Like", "Essential", "Top Hits from"];

// Function to get a random element from an array
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// List to store generated playlist names
let playlistNames = [];

// Generating 100 random playlist names
for (let i = 0; i < 50; i++) {
  const genre = getRandomElement(genres);
  const phrase = getRandomElement(phrases);
  const number = Math.floor(Math.random() * 100) + 1;
  const playlistName = `${phrase} ${genre} #${number}`;
  playlistNames.push(playlistName);
}

const randPL = document.getElementById("playlist");

playlistNames.forEach((name) => {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.className = "p-playlist my-text-secondary fs-8 pointer";
  p.textContent = name;
  div.appendChild(p);
  randPL.appendChild(div);
});

// SCROLL BAR FUNCTION
const content = document.getElementById("content");
content.addEventListener("scroll", function () {
  let nav = document.getElementsByName("nav");
  if (content.scrollY > 50) {
    // Check if the scroll position is greater than 50
    nav.style.backgroundColor = "black";
  } else {
    nav.style.backgroundColor = "none";
  }
});

//FETCH
// Fetch dei dati generali dell'API
const host = "deezerdevs-deezer.p.rapidapi.com";

async function getGenreDetails(genreId) {
  const urlGenres = `https://deezerdevs-deezer.p.rapidapi.com/genre/${genreId}`;
  const optionsGenres = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": token,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    const response = await fetch(urlGenres, optionsGenres);
    const genreDetails = await response.json();
    console.log(genreDetails);
  } catch (error) {
    console.error(error);
  }
}

// CARD GRANDI
function createAlbumCard(album, artistName) {
  // Crea un elemento div per la card
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col", "g-0", "m-0", "card-group", "pointer");
  cardDiv.innerHTML = `
        <div class="card bg-dark rounded-3">
            <div class="card-body mb-auto">
                <img src="${album.cover_medium}" class="card-img-top rounded-3" style="object-fit: cover;" alt="${album.title}" />
            </div>
            <div class="card-body d-flex flex-column align-item-baseline">
                <p class="fw-bold mb-1 text-truncate">${album.title}</p>
                <span class="text-secondary flex-grow-1">${artistName}</span>
            </div>
        </div>
    `;

  // Aggiungi un listener di click alla card
  cardDiv.addEventListener("click", () => {
    // Redirect alla pagina dell'album con l'ID dell'album come parametro URL
    window.location.href = `album.html?album_id=${album.id}`;
  });

  return cardDiv;
}

// CARD PICCOLE
function createPlaylistCard(album, artistName) {
  // Crea un elemento div per la card
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col", "g-0", "m-0", "card-group", "pointer");

  // Definisci l'HTML per la card della playlist
  cardDiv.innerHTML = `
	<div class="card mb-3 bg-dark me-3 position-relative">
    <div class="row g-2 icon-hover">
        <div class="col-md-4">
            <img src="${album.cover_medium}" class="img-fluid rounded-start" alt="${album.title}" width="80" height="80"/>
        </div>
        <div class="col-md-8">
            <div class="card-body d-flex flex-column justify-content-center">
                <h6 class="fw-bold text-truncate">${album.title}</h6>
				<svg
				class="play-icon position-absolute bottom-0 end-0"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				width="60"
				height="50"
				fill="#1db954"
			>
				<!-- Cerchio verde -->
				<circle cx="47" cy="50" r="25" fill="#1db954" />
				<!-- Triangolo nero che punta verso destra -->
				<polygon points="60,50 40,60 40,40" fill="#000000" />
			</svg>
            </div>
        </div>
    </div>
</div>
    `;

  cardDiv.addEventListener("click", () => {
    // Redirect alla pagina dell'album con l'ID dell'album come parametro URL
    window.location.href = `album.html?album_id=${album.id}`;
  });

  return cardDiv;
}

async function loadAlbums() {
  const artists = ["Eminem", "Adele", "Drake", "Rihanna", "Ed Sheeran", "Taylor Swift"]; // Lista di artisti
  const searchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": token,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    const albumsContainer = document.getElementById("albums-container");
    albumsContainer.innerHTML = ""; // Pulisci il contenitore esistente

    for (const artist of artists) {
      const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q="${artist}"`;
      const searchResponse = await fetch(searchUrl, searchOptions);
      const searchData = await searchResponse.json();

      if (searchData && searchData.data && searchData.data.length > 0) {
        // Seleziona un album casuale dall'artista corrente
        const randomAlbumIndex = Math.floor(Math.random() * searchData.data.length);
        const album = searchData.data[randomAlbumIndex].album;
        // Chiamata alla funzione createAlbumCard
        const albumCard = createAlbumCard(album, searchData.data[randomAlbumIndex].artist.name);
        albumsContainer.appendChild(albumCard); // Aggiungi la card al contenitore
      } else {
        console.log(`Nessun risultato trovato per ${artist}.`);
      }
    }
  } catch (error) {
    console.error("Errore nel caricamento degli album:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAlbums);
document.addEventListener("DOMContentLoaded", loadPlaylists);
document.addEventListener("DOMContentLoaded", loadBanner);

async function loadPlaylists() {
  const artists = ["Eminem", "Adele", "Drake", "Rihanna", "Ed Sheeran", "Taylor Swift"]; // Lista di artisti

  const searchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": token,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    const playlistsContaier = document.getElementById("playlists-container");
    playlistsContaier.innerHTML = "";

    for (const artist of artists) {
      const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q="${artist}"`;
      const searchResponse = await fetch(searchUrl, searchOptions);
      const searchData = await searchResponse.json();

      if (searchData && searchData.data && searchData.data.length > 0) {
        // Seleziona un album casuale dall'artista corrente
        const randomAlbumIndex = Math.floor(Math.random() * searchData.data.length);
        const album = searchData.data[randomAlbumIndex].album;
        // Chiamata alla funzione createAlbumCard
        const PlaylistCard = createPlaylistCard(album, searchData.data[randomAlbumIndex].artist.name);
        playlistsContaier.appendChild(PlaylistCard);
      } else {
        console.log(`Nessun risultato trovato per ${artist}.`);
      }
    }
  } catch (error) {
    console.error("Errore nel caricamento degli album:", error);
  }
}

function createbannerCard(album, artistName) {
  // Crea un elemento div per la card
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col", "g-0", "m-0", "card-group", "pointer");
  cardDiv.innerHTML = `
	<div id="banner" class="card mb-3 position-relative">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${album.cover_big}" class="img-fluid rounded-start" alt="${album.title}" width="210" height="210" />
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${artistName}</p>
                <p class="card-text">Ascolta il nuovo singolo di: ${artistName}!</p>
                <div class="d-flex gap-3">
                    <button class="btn btn-success rounded-pill my-black fw-bold hover px-2 py-1">Play</button>
                    <button class="btn btn-success rounded-pill my-black fw-bold hover px-2 py-1">Salva</button>
                    <span>
                        <i class="bi bi-three-dots text-dark fs-3 pointer"></i>
                    </span>
                </div>
                <p class="card-text"><small class="text-body-secondary">ALBUM</small></p>
				</div>
				<button class="btn btn-dark rounded my-btn-bg rounded-pill align-self-start ms-auto position-absolute top-0 end-0 m-2">
					<span class="fs-8 text-secondary">NASCONDI ANNUNCI</span>
				</button>
        </div>
    </div>
</div>
    `;

  cardDiv.addEventListener("click", () => {
    // Redirect alla pagina dell'album con l'ID dell'album come parametro URL
    window.location.href = `album.html?album_id=${album.id}`;
  });

  return cardDiv;
}

async function loadBanner() {
  const searchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": token,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    const loadContainer = document.getElementById("bannerContainer");
    bannerContainer.innerHTML = "";

    const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q="Eminem"`;
    const searchResponse = await fetch(searchUrl, searchOptions);
    const searchData = await searchResponse.json();

    if (searchData && searchData.data && searchData.data.length > 0) {
      // Seleziona un album casuale dall'artista corrente
      const randomAlbumIndex = Math.floor(Math.random() * searchData.data.length);
      const album = searchData.data[randomAlbumIndex].album;
      // Chiamata alla funzione createAlbumCard
      const bannerCard = createbannerCard(album, searchData.data[randomAlbumIndex].artist.name);
      loadContainer.appendChild(bannerCard);
    } else {
      console.log(`Nessun risultato trovato per Eminem`);
    }
  } catch (error) {
    console.error("Errore nel caricamento degli album:", error);
  }
}
