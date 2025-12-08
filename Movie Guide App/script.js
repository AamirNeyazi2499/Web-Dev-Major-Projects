const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movie) => {
    try {

        movieContainer.innerHTML = "<h2>Loading...</h2>";
        
        const myAPIKey = "*******";

        const url = `https://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Unable to fetch movie data");
        }
        
        const data = await response.json();

        if (data.Response === "False") {
            movieContainer.innerHTML = `<h2>Movie not found!</h2>
                                    <p>Try searching for another movie</p>`;
            return;
        }
        
        showMovieData(data);
        
    } catch (error) {
        movieContainer.innerHTML = `<h2>Error: ${error.message}</h2>`;
    }
}

const showMovieData = (data) => {

    movieContainer.innerHTML = "";

    const {
        Title = "N/A",
        imdbRating = "N/A",
        Genre = "N/A",
        Released = "N/A",
        Poster = "",
        Actors = "N/A",
        Plot = "N/A",
        Director = "N/A",
        Runtime = "N/A"
    } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-card');
    movieElement.innerHTML = `
        <div class="movie-poster">
            ${Poster !== "N/A" ? `<img src="${Poster}" alt="${Title}">` : '<div class="no-poster">No Image Available</div>'}
        </div>
        <div class="movie-details">
            <h2>${Title}</h2>
            <p><strong>IMDb Rating:</strong> ⭐ ${imdbRating}/10</p>
            <p><strong>Genre:</strong> ${Genre}</p>
            <p><strong>Released:</strong> ${Released}</p>
            <p><strong>Runtime:</strong> ${Runtime}</p>
            <p><strong>Director:</strong> ${Director}</p>
            <p><strong>Cast:</strong> ${Actors}</p>
            <p><strong>Plot:</strong> ${Plot}</p>
        </div>
    `;
    
    movieContainer.appendChild(movieElement);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    } else {
        movieContainer.innerHTML = "<h2>Please enter a movie name</h2>";
    }
});

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchForm.dispatchEvent(new Event('submit'));
    }
});
