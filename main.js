const API_KEY = "api_key=d2b5af87a64d923fbc9cd42aa4272fb1";
const BASE_URL = "https://api.themoviedb.org/3";
const allURL = "/discover/movie?sort_by=popularity.desc&";
const imgURL = "https://image.tmdb.org/t/p/w500";
const API_URL = BASE_URL + allURL + API_KEY;

const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.querySelector("#main");
const form = document.querySelector("#form");

console.log(API_URL);

// getMovies(API_URL);

// function getMovies(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       showMovies(data.results);
//     });
// }

const getMovies = async (url) => {
  const data = await fetch(url);
  return data.json();
};

getMovies(API_URL)
  .then((data) => showMovies(data.results))
  .catch((error) => console.error("ERROR: " + error));

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, overview, vote_average, poster_path } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${imgURL}${poster_path}" alt="image">

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
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
