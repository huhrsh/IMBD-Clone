const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=882c299e'; 

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const heartIcon=document.getElementById('heart-icon');

const emptySearch=document.getElementById('empty-search')

searchInput.addEventListener('input',searchMovies);

function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        searchResults.innerHTML = '';
        emptySearch.style.display='flex';
        return;
    }
    emptySearch.style.display='none';
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=882c299e&s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                const movies = data.Search;
                searchResults.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
            }
        })
        .catch(error => console.error(error));
}

function createMovieCard(movie) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(movie.imdbID);
    const buttonText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
    return `
        <div class="movie-card">
            <img class="card-img" src=${movie.Poster} alt="Movie Poster">
            <div  class="card-heading">
                <a target="_blank" href="./HTML/movie.html?id=${movie.imdbID}">${movie.Title}</a>
                <p class="card-year">${movie.Year}</p>
                <p class="card-year">${movie.Type}</p>
                <button class=${isFavorite?"unfav-btn":"fav-btn"} onclick="addToFavorites('${movie.imdbID}')">${buttonText}</button>
            </div>
        </div>
    `;
}

function addToFavorites(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieIndex = favorites.indexOf(movieId);
    // Movie already exists in favorites, so remove it
    if (movieIndex !== -1) {
        favorites.splice(movieIndex, 1);
    } 
    // Movie doesn't exist in favorites, so add it
    else {
        favorites.push(movieId);
        heartIcon.style.animation='heartAnimation 0.5s ease-in-out';
        setTimeout(()=>{
            heartIcon.style.animation='';
        },500)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Refresh the page to highlight the results 
    searchMovies();
}

// Add more functionality for movie page and my favorite movies page
// Use the same structure as above for movie.html and implement similar logic for displaying movie details and favorites.
