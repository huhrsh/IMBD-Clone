const favoriteMoviesContainer = document.getElementById('favoriteMovies');

function displayFavoriteMovies() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoriteMoviesContainer.innerHTML = '<p>No favorite movies added yet.</p>';
        return;
    }
    favoriteMoviesContainer.innerHTML=``;
    favorites.forEach(movieId => {
        fetch(`https://www.omdbapi.com/?apikey=882c299e&i=${movieId}`)
            .then(response => response.json())
            .then(movie => {
                const movieCard = createFavoriteMovieCard(movie);
                favoriteMoviesContainer.insertAdjacentHTML('beforeend', movieCard);
            })
            .catch(err => {
                console.log("Error in fetching", err);
            });
    });
}

function createFavoriteMovieCard(movie) {
    return `
        <div class="movie-card">
            <img class="card-img" src=${movie.Poster} alt="Movie Poster">
            <div  class="card-heading">
                <a target="_blank" href="./movie.html?id=${movie.imdbID}">${movie.Title}</a>
                <p class="card-year">${movie.Year}</p>
                <p class="card-year">${movie.Type}</p>
                <button class="unfav-btn" onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
            </div>
        </div>
    `;
}

function removeFromFavorites(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieIndex = favorites.indexOf(movieId);

    if (movieIndex !== -1) {
        favorites.splice(movieIndex, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavoriteMovies(); // Refresh the displayed favorites
    }
}

displayFavoriteMovies();
