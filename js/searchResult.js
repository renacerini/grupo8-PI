

var apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
var imgBase = 'https://image.tmdb.org/t/p/w500';

var qs = new URLSearchParams(location.search);
var termino = qs.get('query');
var tipo = qs.get('tipo');

var titulo = document.querySelector('.busqueda');
var cont = document.querySelector('.resultados');

titulo.innerText = 'Resultados de búsqueda para: "' + termino + '"';

if (termino !== null && termino !== '') {
  buscar(termino, tipo ? tipo : 'movie');
}

function buscar(texto, tipoBusqueda) {
  var textoSeguro = texto.split(' ').join('%20');
  var url = 'https://api.themoviedb.org/3/search/' + tipoBusqueda + '?api_key=' + apiKey + '&query=' + textoSeguro;

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      cont.innerHTML = '';

      if (data.results.length === 0) {
        cont.innerHTML = '<div class="sinresultados"><img src="./imagenes/warning.webp" alt="sin resultados"><p>No se encontraron resultados para "' + texto + '".</p></div>';
      } else {
        var i = 0;
        while (i < data.results.length) {
          var item = data.results[i];
          var id = item.id;
          var nombre = tipoBusqueda === 'movie' ? item.title : item.name;
          var fecha = tipoBusqueda === 'movie' ? item.release_date : item.first_air_date;
          var poster = item.poster_path ? imgBase + item.poster_path : './imagenes/placeholder.png';

          cont.innerHTML +=
            '<article class="resultadoitem">' +
              '<a class="resultadolink" href="./detalle' + (tipoBusqueda === 'movie' ? 'Pelicula' : 'Serie') + '.html?id=' + id + '">' +
                '<img class="resultadoimg" src="' + poster + '" alt="' + nombre + '">' +
                '<div class="resultadoinfo">' +
                  '<h2>' + nombre + '</h2>' +
                  '<p class="categoria">' + (tipoBusqueda === 'movie' ? 'Película' : 'Serie') + '</p>' +
                  '<p class="fecha">' + (fecha ? fecha : '') + '</p>' +
                '</div>' +
              '</a>' +
            '</article>';

          i = i + 1;
        }
      }
    })
    .catch(function () {
      cont.innerHTML = '<div class="sinresultados"><img src="./imagenes/warning.webp" alt="sin resultados"><p>Ocurrió un error al buscar. Intentalo de nuevo.</p></div>';
    });
}