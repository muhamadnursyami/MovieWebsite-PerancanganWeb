const API_KEY = "api_key=5af9997b515c36900b2a600efc4c04c3";
const BASE_URL = "https://api.themoviedb.org/3";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = "https://api.themoviedb.org/3/search/movie?query=";
const MOVIES_PAGE_URL = BASE_URL + "/discover/movie?" + API_KEY;

const movies_pages = document.getElementById("movies-grid");
const form = document.getElementById("form");
const search = document.getElementById("search");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;
// HALAMAN MOVIES PAGES

getMoviesPages(MOVIES_PAGE_URL);

function getMoviesPages(url) {
  lastUrl = url;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      moviesPages(data.results);
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
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

      movies_pages.scrollIntoView({ behavior: "smooth" });
    });
}
function moviesPages(data) {
  movies_pages.innerHTML = "";

  data.forEach((movie) => {
    const { id, poster_path, title, vote_average, release_date } = movie;
    const date = release_date.split("-")[0];
    const elementMovie = document.createElement("div");
    elementMovie.classList.add("movie-card");
    elementMovie.addEventListener("click", function () {
      window.location.href = `detail-movies.html?id=${id}`;
    });
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

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMoviesPages(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getMoviesPages(url);
  }
}
