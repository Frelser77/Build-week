import { token } from "./token.js";

const host = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const albumId = new URLSearchParams(window.location.search).get("album_id");
console.log(albumId);
URL = host + albumId;
fetch(URL, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
  },
})
  .then((resp) => resp.json())
  .then(({ title, cover_medium, artist, release_date, nb_tracks, duration }) => {
    const duration1 = duration.toString();
    //const duration2 = duration.toString();
    const albumBanner = document.getElementById("albumWrapper");
    albumBanner.innerHTML = `
    <img src="${cover_medium}" width="200" height="200" class="shadowAlbum" alt="#" />
    <div class="d-flex flex-column ms-4 justify-content-end">
        <span class="fs-8 fw-bold">ALBUM</span>
        <h2 class="display-3 fw-bold mb-4">${title}</h2>
        <div class="d-flex">
            <img${artist.picture}"
                class="rounded-circle"
                width="25"
                height="25"
                alt="#"
            />
            <p class="ms-2 mb-0">
                ${artist.name} <span>- ${release_date} - ${nb_tracks} Tracks, </span
                ><span class="text-secondary">${duration1.slice(0, 2)} Minutes</span>
            </p>
        </div>
    </div>
    `;
  })
  .catch((error) => console.log(error));

fetch(URL, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
  },
})
  .then((resp) => resp.json())
  .then(({ artist, tracks }) => {
    const tracksArray = tracks.data;
    for (let index = 0; index < tracksArray.length; index++) {
      const track = tracksArray[index];

      const dur1 = track.duration;
      const string = dur1.toString();
      const tableBody = document.getElementById("tableBody");
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td class="pointer">
      <p class="mb-1 text-light">${track.title}</p>
      <span>${artist.name}</span>
    </td>
    <td>${track.rank}</td>
    <td>${string.slice(0, 1)} min ${string.slice(1)} sec</td>
  `;
      tableBody.appendChild(tableRow);
    }
  })
  .catch((error) => console.log(error));
