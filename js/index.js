const apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
.then (function(respuesta) {
    return respuesta.json();
})
.then(function(datos){
    let contenedor = document.querySelector('.peliculas .elementos');
    contenedor.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        let pelicula = datos.results[i];
        contenedor.innerHTML += `
            <div class="elemento"> 
            <a href="./detallePelicula.html?id=${pelicula.id}">
            <img src="${imgBaseUrl + pelicula.poster_path}" alt="${pelicula.title}">
            <div class="detalles"
            <h3>${pelicula.title}</h3>
            <p>${pelicula.release_date}</p>
            </div>
          </a>
        </div>
      `;
    }

}

);