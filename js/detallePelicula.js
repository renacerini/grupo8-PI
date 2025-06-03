const apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

const queryString = location.search;
const queryStringObj = new URLSearchParams(queryString);
const id = queryStringObj.get("id");

const main = document.querySelector(".maindetalle");

fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
.then(response => response.json)
. then(data => {
    main.innerHTML = `
    <section>
        <img src="${imgBaseUrl + data.poster_path}" alt="${data.title}" class="fotodetalle">
    </section>

    <section class="detalle">
          <h2>${data.title}</h2>

          <h3>Rating: ${data.vote_average}</h3>

          <p class="fecha">${data.release_date}</p>

          <p class="duracion">▷ ${data.runtime} minutos</p>

          <p class="genero">
              ${data.genres.map(genero => `<a href="./detalleGenero.html?id=${genero.id}&type=movie">${genero.name}</a>`).join(', ')}
          </p>

          <p class="sinopsis">${data.overview}</p>
      </section>
    `;
})
.catch(error => {
  console.error('Error al obtener detalles de la película:', error);
});