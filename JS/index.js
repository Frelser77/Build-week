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
	const p = document.createElement("p");
	p.className = "p-playlist";
	p.textContent = name;
	randPL.appendChild(p);
});
