const API_KEY = "98d1f55a917eabfae7afd373b111b43e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");
const title = document.getElementById("title");
async function getTrendingMovies(){
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  title.innerHTML = `Trending Movies`;
  displayMovies(data.results);
}
async function searchMovies(query){
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  title.innerHTML = `Search Results for "${query}"`;
  displayMovies(data.results);
}
function displayMovies(movies){
  moviesContainer.innerHTML = "";
  movies.forEach(movie=>{
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
    `;
    moviesContainer.appendChild(movieEl);
  });
}
searchInput.addEventListener("input",(e)=>{
  const query = e.target.value;
  if (query){
    searchMovies(query);
  } else{
    getTrendingMovies();
  }
});
getTrendingMovies();