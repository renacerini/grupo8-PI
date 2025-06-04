const apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';


const query = location.search;
const queryObj = new URLSearchParams(query);
const generoId = queryObj.get('id');
const type = queryObj.get('type'); 
const generoNombre = queryObj.get('name'); 

const titulo = document.querySelector(".titulo-genero");

if (titulo && generoNombre) {
    titulo.innerText = generoNombre.toUpperCase();
  }


const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&with_genres=${generoId}&language=es`;


const contenedor = document.querySelector(".elementos");
contenedor.innerHTML = "<p>Cargando contenido...</p>";

fetch(url)
  .then(response => response.json())
  .then(data => {
    contenedor.innerHTML = "";

    if (data.results.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron resultados para este género.</p>";
      return;
    }

    data.results.forEach(item => {
      const nombre = type === "movie" ? item.title : item.name;
      const fecha = type === "movie" ? item.release_date : item.first_air_date;
      const id = item.id;
      const link = type === "movie"
        ? `./detallePelicula.html?id=${id}`
        : `./detalleSerie.html?id=${id}`;

      contenedor.innerHTML += `
        <div class="elemento">
          <a href="${link}">
            <img src="${imgBaseUrl + item.poster_path}" alt="${nombre}">
            <div class="detalles">
              <h3>${nombre}</h3>
              <p>${fecha}</p>
            </div>
          </a>
        </div>
      `;
    });
  })
  .catch(error => {
    console.error("Error al obtener datos del género:", error);
    contenedor.innerHTML = "<p>Hubo un error al cargar el contenido. Intentalo más tarde.</p>";
  });