let movieId=window.location.href.split('?id=')[1];
let movieCard=document.getElementById('movieCard')
let movieName=document.getElementById("movie-name");    

fetch(`https://www.omdbapi.com/?apikey=882c299e&i=${movieId}`)
    .then(response => response.json())
    .then(movie => {
            document.querySelector('title').textContent = movie.Title;
            // console.log(movie)
            movieName.innerHTML=`| ${movie.Title}`
            movieCard.innerHTML=
            `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <div class="movie-details">
                <p><strong>Title:</strong>${movie.Title}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Language:</strong> ${movie.Language}</p>
                <p><strong>Released:</strong> ${movie.Released}</p>
                <p><strong>Plot:</strong> ${movie.Plot}${movie.Plot}</p>
                <p><strong>Awards:</strong> ${movie.Awards}</p>
                <p><strong>Country:</strong> ${movie.Country}</p>
                <p><strong>DVD Release:</strong> ${movie.DVD}</p>
                <p><strong>Box Office:</strong> ${movie.BoxOffice}</p>
                <p><strong>Metascore:</strong> ${movie.Metascore}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            </div>
        `;
    })
    .catch(error => console.error(error));
