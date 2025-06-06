const apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';


let generoContainer = document.querySelector('.genero-buttons');

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let generos = data.genres;
    let contenido = "";

    for (let i = 0; i < generos.length; i++) {
      contenido += `
        <a href="./detalleGenero.html?id=${generos[i].id}&tipo=movie" class="genero-btn">
          ${generos[i].name}
        </a>
      `;
    }

    generoContainer.innerHTML = contenido;
  })
  .catch(function (error) {
    console.error('Error al obtener géneros:', error);
  });
