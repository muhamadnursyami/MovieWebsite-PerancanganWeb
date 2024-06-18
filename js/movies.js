const API_KEY = "api_key=5af9997b515c36900b2a600efc4c04c3";
const BASE_URL = "https://api.themoviedb.org/3";

const POPULAR_MOVIES_URL = BASE_URL + "/movie/popular?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = "https://api.themoviedb.org/3/search/movie?query=";
const MOVIES_PAGE_URL = BASE_URL + "/trending/movie/week?" + API_KEY;
const MOVIRES_GENRE = BASE_URL + "/discover/movie?";

const movies_popular = document.getElementById("movies-popular");
const movies_pages = document.getElementById("movies-grid");
const movies_genre = document.getElementById("movies-genre");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsGenre = document.getElementById("tags");
const noResultGenrePage = document.getElementById("no-result-genre");

// HALAMAN MOVIES PAGES

getMoviesPages(MOVIES_PAGE_URL);

function getMoviesPages(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.results);
      moviesPages(data.results);
    });
}
function moviesPages(data) {
  movies_pages.innerHTML = "";

  data.forEach((movie) => {
    const { poster_path, title, vote_average, release_date } = movie;
    const date = release_date.split("-")[0];
    const elementMovie = document.createElement("div");
    elementMovie.classList.add("movie-card");

    elementMovie.innerHTML = `
                    <div class="card-head">
                        <img src="${
                          IMG_URL + poster_path
                        }" class="card-img" alt="">
                        <div class="card-overlay">
                            <div class="bookmark">
                                <ion-icon name="bookmark-outline"></ion-icon>
                            </div>
                            <div class="rating">
                                <ion-icon name="star-outline"></ion-icon>
                                <span>${vote_average}</span>
                            </div>
                            <div class="play">
                                <ion-icon name="play-circle-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${title}</h3>
                        <div class="card-info">
                            <span class="genre">Action/Comedy</span>
                            <span class="year">${date}</span>
                        </div>
                    </div>
    `;

    movies_pages.appendChild(elementMovie);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMoviesPages(searchURL + searchTerm + "&" + API_KEY);
  }
});
