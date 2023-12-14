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

// SCROLL BRA FUNCTION
const navScroll = window.addEventListener("scroll", function () {
  let nav = document.getElementById("nav");
  if (navScroll.scrollY > 10) {
    // Ad esempio, dopo 100px di scroll
    nav.style.backgroundColor = "blue"; // Cambia in blu
  } else {
    nav.style.backgroundColor = "white"; // Torna a bianco
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

// Funzione per creare l'HTML di una card di un album
function createAlbumCard(album, artistName) {
  return `
        <div class="col g-0 m-0 card-group pointer">
            <div class="card bg-dark rounded-3">
                <div class="card-body mb-auto">
                    <img src="${album.cover_medium}" class="card-img-top rounded-3" style="object-fit: cover;" alt="${album.title}" />
                </div>
                <div class="card-body d-flex flex-column align-item-baseline">
                    <p class="fw-bold mb-1">${album.title}</p>
                    <span class="text-secondary flex-grow-1">${artistName}</span>
                </div>
            </div>
        </div>
    `;
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
        const albumCardHtml = createAlbumCard(album, searchData.data[randomAlbumIndex].artist.name);
        albumsContainer.innerHTML += albumCardHtml; // Aggiungi la card al contenitore
      } else {
        console.log(`Nessun risultato trovato per ${artist}.`);
      }
    }
  } catch (error) {
    console.error("Errore nel caricamento degli album:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAlbums);
