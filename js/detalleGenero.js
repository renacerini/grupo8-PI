const apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';


let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let idGenero = queryStringObj.get('id');
let tipo = queryStringObj.get('tipo');


let urlGeneros = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=${apiKey}&language=es`;


fetch(urlGeneros)
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (data) {
    let generos = data.genres;
    let nombreGenero = "Desconocido";

    for (let i = 0; i < generos.length; i++) {
      if (generos[i].id == idGenero) {
        nombreGenero = generos[i].name;
        break;
      }
    }


    let titulo = document.querySelector('.titulo_generos');
    titulo.innerText = `Resultados para género: ${nombreGenero}`;


    let urlContenido = `https://api.themoviedb.org/3/discover/${tipo}?api_key=${apiKey}&with_genres=${idGenero}&language=es`;

    fetch(urlContenido)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (data) {
        let resultados = data.results;
        let contenedor = document.querySelector('.detalles_peliculas_genero');
        contenedor.innerHTML = "";

        for (let i = 0; i < resultados.length; i++) {
          let item = resultados[i];
          contenedor.innerHTML += `
            <article class="pelicula">
              <a href="./${tipo === 'movie' ? 'detallePelicula' : 'detalleSerie'}.html?id=${item.id}" class="hipervinculo">
                <img src="${imgBaseUrl + item.poster_path}" class="imagenPP" alt="${item.title || item.name}">
                <p class="titulo">${item.title || item.name}</p>
                <p class="estreno">${item.release_date || item.first_air_date}</p>
              </a>
            </article>
          `;
        }
      })
      .catch(function (error) {
        console.error("Error al cargar contenido del género:", error);
      });

  })
  .catch(function (error) {
    console.error("Error al obtener el nombre del género:", error);
  });
