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

//FETCH
// Fetch dei dati generali dell'API
const host = "deezerdevs-deezer.p.rapidapi.com";

async function main() {
  try {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/infos`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": token,
        "X-RapidAPI-Host": host,
      },
    });
    const generalInfo = await response.json();
    console.log(generalInfo);
  } catch (error) {
    console.error(error);
  }

  //'userSearchInput' sia la query inserita dall'utente
  const userSearchInput = "Eminem"; // Sostituisci con l'input utente effettivo

  const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(userSearchInput)}`;
  const searchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": token,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    // Ricerca per l'input dell'utente e scegli un album
    const searchResponse = await fetch(searchUrl, searchOptions);
    const searchData = await searchResponse.json();

    if (searchData && searchData.data && searchData.data.length > 0) {
      // Visualizzo i risultati della ricerca e lascio che l'utente scelga un album
      const albums = searchData.data.map((item) => item.album);
      albums.forEach((album, index) => {
        console.log(`${index + 1}: ${album.title} (ID: ${album.id})`);
      });

      // 'albumChoice' Ã¨ l'indice scelto dall'utente, input da impostare
      const albumChoice = 1; // deve essere sostituito con l'input reale dell'utente
      const _idAlbum = albums[albumChoice - 1].id;

      // Ora recupera i dettagli dell'album scelto
      const albumResponse = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${_idAlbum}`, searchOptions);
      const albumInfo = await albumResponse.json();
      console.log(albumInfo);

      // Estraggo genre_id dall'informazione dell'album
      if (albumInfo.genres && albumInfo.genres.data && albumInfo.genres.data.length > 0) {
        const genreId = albumInfo.genres.data[0].id;
        await getGenreDetails(genreId); // Chiama la funzione per ottenere i dettagli del genere
      }
    } else {
      console.log("Nessun risultato trovato per la ricerca.");
    }
  } catch (error) {
    console.error("Errore nella ricerca:", error);
  }
}

main(); // Esecuzione della funzione principale

//FETCH
// Fetch dei dati generali dell'API

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
async function loadAlbums() {
  const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q="eminem"`; // Sostituisci "eminem" con l'artista di tua scelta
  const searchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": token,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    // Esegui la chiamata API
    const searchResponse = await fetch(searchUrl, searchOptions);
    const searchData = await searchResponse.json();

    // Se la risposta ha dei dati, inseriscili nel DOM
    if (searchData && searchData.data && searchData.data.length > 0) {
      const albumsContainer = document.getElementById("albums-container");
      albumsContainer.innerHTML = ""; // Pulisci il contenitore esistente

      // Genera le card per ogni album e aggiungile al contenitore
      searchData.data.forEach((album) => {
        const albumCardHtml = `
                    <div class="col">
                        <div class="card bg-dark rounded-3">
                            <img src="${album.album.cover_medium}" class="card-img-top rounded-3" width="220px" height="220px" alt="${album.album.title}" />
                            <div class="card-body">
                                <h5 class="card-title">${album.album.title}</h5>
                                <p class="card-text">${album.artist.name}</p>
                            </div>
                        </div>
                    </div>
                `;
        albumsContainer.innerHTML += albumCardHtml;
      });
    } else {
      console.log("Nessun risultato trovato.");
    }
  } catch (error) {
    console.error("Errore nel caricamento degli album:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAlbums);
