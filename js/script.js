const API_KEY = "api_key=5af9997b515c36900b2a600efc4c04c3";
const BASE_URL = "https://api.themoviedb.org/3";

const POPULAR_MOVIES_URL = BASE_URL + "/movie/popular?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = "https://api.themoviedb.org/3/search/movie?query=";

const movies_popular = document.getElementById("movies-popular");
const form = document.getElementById("form");
const search = document.getElementById("search");

// HALAMAN HOME PAGE
getMoviesPopular(POPULAR_MOVIES_URL);

function getMoviesPopular(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      moviesPopular(data.results);
    });
}

function moviesPopular(data) {
  movies_popular.innerHTML = "";

  data.forEach((movie) => {
    const { poster_path, title, vote_average, release_date, id } = movie;

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

    movies_popular.appendChild(elementMovie);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMoviesPopular(searchURL + searchTerm + "&" + API_KEY);
  }
});
