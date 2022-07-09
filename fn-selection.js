import { selectedGenre } from "./fn-genres";

function highlightSelected() {
    if (selectedGenre.length !== 0) {
        selectedGenre.forEach(id => {
            const selected = document.querySelector(id);
            selected.classList.add("selected");
        })
    }
}

export { highlightSelected };