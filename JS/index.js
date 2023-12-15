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
for (let i = 0; i < 100; i++) {
	const genre = getRandomElement(genres);
	const phrase = getRandomElement(phrases);
	const number = Math.floor(Math.random() * 100) + 1;
	const playlistName = `${phrase} ${genre} #${number}`;
	playlistNames.push(playlistName);
}

// Output the playlist names
console.log(playlistNames);

const randPL = document.getElementById("playlist");

playlistNames.forEach((name) => {
	const div = document.createElement("div");
	const p = document.createElement("p");
	p.className = "p-playlist my-text-secondary fs-8";
	p.textContent = name;
	div.appendChild(p);
	randPL.appendChild(div);
});

const content = document.getElementById("content");
const nav = document.getElementById("nav");
const btnNavScroll1 = document.getElementById("scroll1");
const btnNavScroll2 = document.getElementById("scroll2");

// Applica la transizione a ciascun bottone
btnNavScroll1.style.transition = "background-color 0.3s";
btnNavScroll2.style.transition = "background-color 0.3s";

// Imposta la transizione per la navbar
nav.style.transition = "background-color 0.3s";

content.addEventListener("scroll", function () {
	if (content.scrollTop > 10) {
		nav.style.backgroundColor = "black";
		btnNavScroll1.style.backgroundColor = "#3A3A3A";
		btnNavScroll2.style.backgroundColor = "#3A3A3A";
	} else {
		nav.style.backgroundColor = "transparent";
		btnNavScroll1.style.backgroundColor = "black";
		btnNavScroll2.style.backgroundColor = "black";
	}
});

///
//FETCH
const host = "deezerdevs-deezer.p.rapidapi.com";
const queryParams = new URLSearchParams(window.location.search);
const albumId = queryParams.get("album_id");
const artistId = queryParams.get("artist_id");

const tracksUrl = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}/tracks.data`;

const fetchOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": token,
		"X-RapidAPI-Host": host,
	},
};

async function fetchAndDisplayArtistInfo(artistId) {
	const apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`;
	const response = await fetch(apiUrl, {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": token,
			"X-RapidAPI-Host": host,
		},
	});
	const artistData = await response.json();

	// Creazione del template con i dati dell'artista
	const artistSectionHtml = `
            <p class="m-0">
                <!-- Icona di artista verificato, mostrata solo se l'artista è verificato -->
                ${
									artistData.verified
										? `
                <svg 		data-encore-id="icon"
				role="img"
				aria-hidden="true"
				viewBox="0 0 24 24"
				width="22"
				height="22"
				fill="#0000FF">
				<path
				d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"
				fill="currentColor"
			></path></svg>
                Artista verificato
                `
										: ""
								}
            </p>
            <h1 class="m-0">${artist.name}</h1>
            <p class="mt-1">${artist.nb_fan} ascoltatori mensili</p>
    `;

	// Aggiunta del template al DOM
	const artistContainer = document.getElementById("artist-info-container");
	artistContainer.innerHTML = artistSectionHtml;
}

fetchAndDisplayArtistInfo(artistId);

async function loadAlbumTracks() {
	try {
		const response = await fetch(tracksUrl, fetchOptions);
		const albumData = await response.json();
		if (albumData.data && albumData.data.length > 0) {
			fetchAndDisplayArtistInfo(artistId);

			albumData.data.forEach((track) => {
				// Crea un elemento della lista per ogni traccia
				// const trackItem = document.createElement("li");
				tracksList.appendChild(trackItem);
			});
		} else {
			console.log("Nessuna traccia trovata per questo album.");
		}
	} catch (error) {
		console.error("Errore durante il caricamento delle tracce:", error);
	}
}

document.addEventListener("DOMContentLoaded", loadAlbumTracks);
