import { genre } from "./genres.js";

const tags = document.querySelector("#tags");

function setGenre() {
  tags.innerHTML = "";
  genre.forEach((g) => {
    const el = document.createElement("div");
    el.classList.add("tag");
    el.id = g.id;
    el.innerText = g.name;
    tags.append(el);
  });
}

export { tags, setGenre };
