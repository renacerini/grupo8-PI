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
          let nombre;
          let fecha;
          let destino;
          
          if (tipo === "movie") {
            nombre = item.title;
            fecha = item.release_date;
            destino = "./detallePelicula.html?id=" + item.id;
          } else {
            nombre = item.name;
            fecha = item.first_air_date;
            destino = "./detalleSerie.html?id=" + item.id;
          }
          
          contenedor.innerHTML += `
            <article class="pelicula">
              <a href="${destino}" class="hipervinculo">
                <img src="${imgBaseUrl + item.poster_path}" class="imagenPP" alt="${nombre}">
                <p class="titulo">${nombre}</p>
                <p class="estreno">${fecha}</p>
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
