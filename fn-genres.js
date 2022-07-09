import { genre } from "./genres.js";

import { getMovies, API_URL } from "./main.js";

const tags = document.querySelector("#tags");

function setGenre() {
  const selectedGenre = [];
  tags.innerHTML = "";
  genre.forEach((g) => {
    const el = document.createElement("div");
    el.classList.add("tag");
    el.id = g.id;
    el.innerText = g.name;
    el.addEventListener("click", () => {
      if (selectedGenre.length === 0) {
        selectedGenre.push(g.id);
        console.log(g.id);
      } else {
        selectedGenre.splice(0, selectedGenre.length);
        el.click();
      }
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
    });
    tags.append(el);
  });
}

export { tags, setGenre };
