let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Add your OMDB API Key here or use environment variable
const key = "ac6311d7"; // Replace with process.env.NEXT_PUBLIC_API_KEY if using React/Next.js

// Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value.trim();

    // If input field is empty
    if (movieName.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        return;
    }

    // Construct API URL (use HTTPS and encode query)
    let url = ` http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Fetch API
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.Response === "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster}" class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            } else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
