
const apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';


let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let idSerie = queryStringObj.get("id");


let url = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${apiKey}&language=es`;


fetch(url)
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(data) {
    
    let contenedor = document.querySelector(".maindetalle");

  
    contenedor.innerHTML = `
      <section>
        <img src="${imgBaseUrl + data.poster_path}" alt="${data.name}" class="fotodetalle">
      </section>

      <section class="detalle">
        <h2>${data.name}</h2>

        <section class="rating">
          <h3>Rating:</h3>
          <p>${data.vote_average}</p>
        </section>

        <p class="fecha">${data.first_air_date}</p>

        <p class="duracion">▷ ${data.number_of_seasons} temporadas</p>

        <p class="genero">
          ${data.genres.map(genero => `<a href="./detalleGenero.html">${genero.name}</a>`).join(', ')}
        </p>

        <p class="sinopsis">${data.overview}</p>
      </section>
    `;
  })
  .catch(function(error) {
    console.error("Error al obtener detalles de la serie:", error);
  });
