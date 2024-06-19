const API_KEY = "api_key=5af9997b515c36900b2a600efc4c04c3";
const BASE_URL = "https://api.themoviedb.org/3";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = "https://api.themoviedb.org/3/search/movie?query=";
const MOVIRES_GENRE = BASE_URL + "/discover/movie?";
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const movies_genre = document.getElementById("movies-genre");
const tagsGenre = document.getElementById("tags");
const noResultGenrePage = document.getElementById("no-result-genre");

// GENRE PAGE
let selectedGenre = [];
setGenre();
function setGenre() {
  tagsGenre.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMoviesGenre(
        MOVIRES_GENRE +
          "&with_genres=" +
          encodeURI(selectedGenre.join(",")) +
          "&" +
          API_KEY
      );
      // console.log(
      //   MOVIRES_GENRE +
      //     "&with_genres=" +
      //     encodeURI(selectedGenre.join(",")) +
      //     "&" +
      //     API_KEY
      // );
      highlightSelection();
    });
    tagsGenre.append(t);
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add("highlight");
    });
  }
}

function getMoviesGenre(url) {
  if (selectedGenre.length === 0) {
    movies_genre.innerHTML = "";
    return;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      if (data.results.length !== 0) {
        noResultGenrePage.innerHTML = "";
        moviesGenre(data.results);
      } else {
        movies_genre.innerHTML = "";
        noResultGenrePage.innerHTML = `<h2>Hasil tidak ditemukan...</h2>`;
      }
    });
}

function moviesGenre(data) {
  movies_genre.innerHTML = "";

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
                          poster_path
                            ? IMG_URL + poster_path
                            : "http://via.placeholder.com/1080x1580"
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

    movies_genre.appendChild(elementMovie);
  });
}
