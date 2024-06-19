const urlParams = new URLSearchParams(window.location.search);
const moviesId = urlParams.get("id");
const API_KEY = "api_key=5af9997b515c36900b2a600efc4c04c3";
const URL_DETAIL_MOVIE = "https://api.themoviedb.org/3/movie/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const detail_movies = document.getElementById("detail-movies");

fetchMoviesDetail();
async function fetchMoviesDetail() {
  try {
    const response = await fetch(URL_DETAIL_MOVIE + moviesId + "?" + API_KEY);
    const data = await response.json();
    const date = data.release_date.split("-")[0];

    detail_movies.innerHTML = `
    <h1 class="detail-movie-title">
            ${data.title}(${date})
        </h1>
        <div class="trailer-videos carousel">
            <button class="carousel-control prev">❮</button>
            <div class="carousel-inner"></div>
            <button class="carousel-control next">❯</button>
        </div>
        <div class="container-detail-movies">
            <div class="col-4">
                <img src="${IMG_URL}${data.poster_path}" alt="">
            </div>
            <div class="col-8">
                <div class="col-2">
                    <h4>Judul : </h4>
                    <h4 class="cl-2">Popularity : </h4>
                    <h4 class="cl-2">Release : </h4>
                    <h4 class="cl-2">Genre : </h4>
                    <h4 class="cl-2">Tagline : </h4>
                    <h4 class="cl-2">Status : </h4>
                    <h4 class="cl-2">Country : </h4>
            </div>
            <div class="col-6">
                    <p>${data.title} (${date})</p>
                    <p class="cl-6">${data.popularity}</p>
                    <p class="cl-6">${data.release_date}</p>
                    <p class="cl-6">${data.genres
                      .map((genre) => genre.name)
                      .join(", ")}</p>
                    <p class="cl-6">${data.tagline}</p>
                    <p class="cl-6">${data.status}</p>
                    <p class="cl-6">${data.production_countries
                      .map((country) => country.name)
                      .join(", ")}</p>
            </div>
            </div>
            
        </div>
        <div class="overview">
            <h1>OverView</h1>
            <p>${data.overview}</p>
        </div>
    `;
    await TrailerMovieId(); 
  } catch (error) {
    console.error("Gagal mengambil detail movies", error);
  }
}

async function TrailerMovieId() {
  try {
    const response = await fetch(
      URL_DETAIL_MOVIE + moviesId + "/videos?" + API_KEY
    );
    const data = await response.json();
    let embedTrailerMovies = [];
    data.results.forEach((video) => {
      let { name, key, site } = video;
      if (site === "YouTube") {
        embedTrailerMovies.push(
          `<div class="carousel-item">
            <iframe src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>`
        );
      }
    });
    document.querySelector(".carousel-inner").innerHTML =
      embedTrailerMovies.join("");
    initCarousel(); 
  } catch (error) {
    console.error("Gagal mengambil trailer movies", error);
  }
}

function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselInner = carousel.querySelector(".carousel-inner");
  const prevButton = carousel.querySelector(".carousel-control.prev");
  const nextButton = carousel.querySelector(".carousel-control.next");
  let currentIndex = 0;

  function updateCarousel() {
    const items = carouselInner.querySelectorAll(".carousel-item");
    items.forEach((item, index) => {
      item.style.display = index === currentIndex ? "block" : "none";
    });
  }

  prevButton.addEventListener("click", () => {
    currentIndex =
      currentIndex === 0 ? carouselInner.children.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex =
      currentIndex === carouselInner.children.length - 1 ? 0 : currentIndex + 1;
    updateCarousel();
  });

  updateCarousel(); 
}
