const API_KEY = "98d1f55a917eabfae7afd373b111b43e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("close-menu");
menuBtn.onclick = () => {
  sidebar.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
function closeMenuFunc() {
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
}
closeMenu.onclick = closeMenuFunc;
overlay.onclick = closeMenuFunc;
const mainContent = document.getElementById("main-content");
const categoriesSection = document.getElementById("categories-section");
const categoriesBtn = document.getElementById("categories-btn");
const homeBtn = document.getElementById("home-btn");
categoriesBtn.onclick = () => {
  mainContent.classList.add("hidden");
  categoriesSection.classList.remove("hidden");
  showCategories();
};
homeBtn.onclick = () => {
  categoriesSection.classList.add("hidden");
  mainContent.classList.remove("hidden");
  getTrendingMovies();
};
const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Horror", id: 27 },
  { name: "Romance", id: 10749 }
];
async function getCategoryMovies(id) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}`);
  const data = await res.json();
  return data.results;
}
async function showCategories() {
  categoriesSection.innerHTML = "";
  for (let genre of genres) {
    const movies = await getCategoryMovies(genre.id);
    const row = document.createElement("div");
    row.classList.add("category-row");
    row.innerHTML = `
      <h2>${genre.name}</h2>
      <div class="category-movies">
        ${movies.filter(m=>m.poster_path).slice(0,10).map(m => `
          <div class="movie">
            <img src="${IMG_URL + m.poster_path}" width="100%">
            <p>${m.title}</p>
            <p class="rating">⭐ ${m.vote_average.toFixed(1)}/10</p>
          </div>
        `).join("")}
      </div>
    `;
    categoriesSection.appendChild(row);
  }
}
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
  try{
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  title.innerHTML = `Search Results for "${query}"`;
  displayMovies(data.results);
} catch (error) {
  console.error("No movies found", error);
}}
function displayMovies(movies){
  moviesContainer.innerHTML = "";
  movies.forEach(movie=>{
    if (!movie.poster_path) return;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p class="rating">⭐ ${movie.vote_average.toFixed(1)}/10</p>
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
