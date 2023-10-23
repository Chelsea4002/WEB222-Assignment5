/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Hyerang Cho
 *      Student ID: 165832221
 *      Date:       August 03, 2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.

const { artists, songs } = window;

window.addEventListener("DOMContentLoaded", defaultDisplay);

function createButton(artist) {
  var button = document.createElement("button");
  button.textContent = artist.name;
  button.addEventListener("click", function () {
    displaySongs(artist);
  });
  return button;
}

function createButtons() {
  var menu = document.getElementById("menu");

  for (let i = 0; i < window.artists.length; i++) {
    var artist = window.artists[i];
    var button = createButton(artist);
    menu.appendChild(button);
  }
}

function defaultDisplay() {
  createButtons();
  displaySongs(window.artists[0]);
}

function createSongCard(song) {
  const card = document.createElement("div");
  card.classList.add("productCard");

  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("image");
  card.appendChild(songImg);

  const songTitle = document.createElement("h3");
  songTitle.textContent = song.title;
  songTitle.classList.add("songName");
  card.appendChild(songTitle);

  const year = document.createElement("time");
  year.textContent = song.year;
  year.classList.add("yearRecorded");
  card.appendChild(year);

  // adding play emoji
  const durationContainer = document.createElement("span");
  durationContainer.classList.add("durationContainer");

  const playIcon = document.createElement("span");
  playIcon.textContent = "▶";
  playIcon.classList.add("playIcon");
  durationContainer.appendChild(playIcon);

  const duration = document.createElement("span");
  var minutes = Math.floor(song.duration / 60);
  var seconds = song.duration % 60;
  duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  duration.classList.add("duration");
  durationContainer.appendChild(duration);
  card.appendChild(durationContainer);

  return card;
}

// DISPLAY
function displaySongs(artist) {
  var links = artist.links
    .map(function (link) {
      return `<a href="${link.url}">${link.name}</a>`;
    })
    .join(", ");

  var selectedArtistTitle = document.getElementById("selected-artist");
  selectedArtistTitle.innerHTML = `${artist.name} (${links})`;

  var container = document.querySelector(".container");
  container.innerHTML = "";

  var artistSongs = window.songs.filter(function (song) {
    return song.artistId === artist.id && !song.flagged;
  });

  artistSongs.forEach(function (song) {
    const songCard = createSongCard(song);
    container.appendChild(songCard);
  });
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
