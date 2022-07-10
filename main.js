import { tags, setGenre } from "./fn-genres.js";
import { genresToggle } from "./genres-btn.js";
import { genre } from "./genres.js";

const API_KEY = "api_key=d2b5af87a64d923fbc9cd42aa4272fb1";
const BASE_URL = "https://api.themoviedb.org/3";
const ALL_URL = "/discover/movie?sort_by=popularity.desc&";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const QUERY = "&query=";
export const API_URL = BASE_URL + ALL_URL + API_KEY;

const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.querySelector("#main");
const form = document.querySelector("#form");

//pagination elements

const prev = document.querySelector("#prev");
const current = document.querySelector("#current");
const next = document.querySelector("#next");

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

// modal

const modal = document.getElementById("");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];


console.log(API_URL);

getMovies(API_URL);

export function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results);

      currentPage = data.page;
      console.log(currentPage);
      nextPage = data.page + 1;
      prevPage = data.page - 1;
      totalPages = data.total_pages;

      current.innerText = currentPage;

      if (currentPage <= 1) {
        prev.classList.add("disabled");
        next.classList.remove("disabled");
      } else if (currentPage >= totalPages) {
        prev.classList.remove("disabled");
        next.classList.add("disabled");
      } else {
        prev.classList.remove("disabled");
        next.classList.remove("disabled");
      }
      main.scrollIntoView({behavior: 'smooth'})

      if (data.results.length === 0) {
        console.log("PUSTO");
        getMovies(API_URL);
      }
    });
}

export function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const {
      title,
      overview,
      vote_average,
      vote_count,
      genre_ids,
      popularity,
      release_date,
      original_title,
      id,
      poster_path,
    } = movie;

    // document.querySelector(`#${btnId}`).addEventListener("submit", showModal);
    // document.querySelector(`#${modalClose}`).addEventListener("click", hideModal);

    // function showModal() {
    //   document.querySelector(`#${modalId}`).style.display = "block";
    //   console.log("KLIK");
    // }

    // function hideModal() {
    //   modal.style.display = "none";
    // }

    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");

    let genreArrayOfObj = genre.filter(function (g) {
      return genre_ids.indexOf(g.id) !== -1;
    });
    console.log(genreArrayOfObj);

    const genreNames = genreArrayOfObj.map((a) => a.name);
    console.log(genreNames.join(", "));

    movieEl.innerHTML = `
      <button type="button" id="${id}">asasasas</button><img src="${
      poster_path
        ? IMG_URL + poster_path
        : "https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg"
    }" alt="image">
      <div class="movie-info">
          <h3>${title}</h3>
          <p>${genreNames.join(", ")} | ${release_date.slice(
      0,
      4
    )} <span class="${getColor(
      vote_average
    )}">${vote_average}</span></p>        
      </div>
      
      <div id="modal+${id}" class="modal">
        <div class="modal-content">
          <span id="close+${id}"class="close">x</span>
          <div class="modal-content__sides">
            <img src="${
              poster_path
                ? IMG_URL + poster_path
                : "https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg"
            }" alt="image">
          <div class="modal-content__img"></div>
          <!-- -->
          <div class="modal-content__right-side">
          <h2 class="modal-content__title">${title}</h2>
          <div class="modal-content__items">
            <p class="modal-content__items--vote">${vote_average} / ${vote_count}</p>
            <p class="modal-content__items--popularity">${Math.round(
              popularity
            ).toLocaleString()}</p>
            <p class="modal-content__items--title">${original_title}</p>
            <p class="modal-content__items--genre">${genreNames[0]}</p>
          </div>
          <h3 class="modal-content__about">About</h3>
          <p class="modal-content__description">${overview}</p>
          <div class="modal-content__buttons">
            <button type="button" class="modal-content__buttons--add-to-watched">ADD TO WATCHED</button>
            <button type="button" class="modal-content__buttons--add-to-queue">ADD TO QUEUE</button>
          </div>
          </div>
        </div>
        </div>
      </div>
      `;
    main.appendChild(movieEl);

    // const btnId = id;
    // const modalId = 'modal' + id;
    // const modalClose = 'close' + id;

    // btnId.addEventListener("click", console.log(id));



  });
}

//vote colors

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
}

//search by keyword

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

next.addEventListener("click", () => {
  if (nextPage > 0) {
    pageCall(nextPage);
  }
});

prev.addEventListener("click", () => {
  if (prevPage <= totalPages) {
    pageCall(prevPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("?");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] !== "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}

// modal

// const modal = document.getElementById("myModal");
// const btn = document.getElementById("myBtn");
// const span = document.getElementsByClassName("close")[0];

// btn.onclick = function () {
//   modal.style.display = "block";
//   console.log("click!");
// };

// span.onclick = function () {
//   modal.style.display = "none";
// };

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };


// https://www.youtube.com/watch?v=zrv_SAnnmtk&t=983s 4:10