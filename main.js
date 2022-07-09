import { tags, setGenre } from "./fn-genres.js";
import { genresToggle } from "./genres-btn.js";

const API_KEY = "api_key=d2b5af87a64d923fbc9cd42aa4272fb1";
const BASE_URL = "https://api.themoviedb.org/3";
const ALL_URL = "/discover/movie?sort_by=popularity.desc&";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const QUERY = "&query=";
export const API_URL = BASE_URL + ALL_URL + API_KEY;

const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.querySelector("#main");
const form = document.querySelector("#form");

console.log(API_URL);

getMovies(API_URL);

export function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results);
      if (data.results.length === 0) {
        console.log("PUSTO");
        getMovies(API_URL);
      }
    });
}

export function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, overview, vote_average, poster_path } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${
        poster_path
          ? IMG_URL + poster_path
          : "https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg"
      }" alt="image">
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
          <h3>Overview</h3>
          <p>${overview}</p>
      </div>
      `;
    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + QUERY + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

// genres

setGenre();

const genresBtn = document.querySelector(".genres-button");
genresBtn.addEventListener("click", genresToggle);

// pagination



