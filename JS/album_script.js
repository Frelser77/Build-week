import { token } from "./token.js";
import { toggleSearch } from "./index.js";

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
const nav = document.getElementById("nav");
const btnNavScroll1 = document.getElementById("scroll1");
const btnNavScroll2 = document.getElementById("scroll2");
btnNavScroll1.transition = "background-color 0.4s";
btnNavScroll2.transition = "background-color 0.4s";
nav.style.transition = "background-color 0.4s";

content.addEventListener("scroll", function () {
	if (content.scrollTop > 50) {
		nav.style.backgroundColor = "black";
		btnNavScroll1.style.backgroundColor = "#2a2a2a";
		btnNavScroll2.style.backgroundColor = "#2a2a2a";
	} else {
		nav.style.backgroundColor = "transparent";
		btnNavScroll1.style.backgroundColor = "black";
		btnNavScroll2.style.backgroundColor = "black";
	}
});
