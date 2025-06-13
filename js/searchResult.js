var apiKey = 'ffb64d9c399d8207818303ad9c5d6ee3';
var imgBase = 'https://image.tmdb.org/t/p/w500';

var qs = new URLSearchParams(location.search);
var termino = qs.get('query');
var tipo = qs.get('tipo');

var titulo = document.querySelector('.busqueda');
var cont = document.querySelector('.resultados');
var cargando = document.querySelector('.cargando');

titulo.innerText = 'Resultados de búsqueda para: "' + termino + '"';

if (termino === null || termino === '' || termino.length < 3) {
  alert('Por favor ingrese al menos 3 caracteres para buscar.');
} else {
  let tipoFinal;
  if (tipo) {
    tipoFinal = tipo;
  } else {
    tipoFinal = 'movie';
  }
  buscar(termino, tipoFinal);
}

function buscar(texto, tipoBusqueda) {
  var textoSeguro = texto.split(' ').join('%20');
  var url = 'https://api.themoviedb.org/3/search/' + tipoBusqueda + '?api_key=' + apiKey + '&query=' + textoSeguro;

  cargando.style.display = 'flex';

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      cargando.style.display = 'none';
      cont.innerHTML = '';

      if (data.results.length === 0) {
        titulo.innerText = '';
        cont.innerHTML = '';
        var sinResultados = document.createElement('div');
        sinResultados.className = 'sinresultados';
        sinResultados.style.display = 'flex';
        sinResultados.innerHTML = '<img src="./imagenes/warning.webp" alt="sin resultados"><p>No se encontraron resultados para "' + texto + '".</p>';
        var mensajeSinResultados = '<div class="sinresultados" style="display:flex"><img src="./imagenes/warning.webp" alt="sin resultados"><p>No se encontraron resultados para "' + texto + '".</p></div>';
        cont.innerHTML = mensajeSinResultados;
      } else {
        var i = 0;
        while (i < data.results.length) {
          var item = data.results[i];
          var id = item.id;
          var nombre;
          if (tipoBusqueda === 'movie') {
            nombre = item.title;
          } else {
            nombre = item.name;
          }

          var fecha;
          if (tipoBusqueda === 'movie') {
            fecha = item.release_date;
          } else {
            fecha = item.first_air_date;
          }

          var poster;
          if (item.poster_path) {
            poster = imgBase + item.poster_path;
          } else {
            poster = './imagenes/placeholder.png';
          }

          var destino;
          if (tipoBusqueda === 'movie') {
            destino = './detallePelicula.html?id=' + id;
          } else {
            destino = './detalleSerie.html?id=' + id;
          }

          let categoriaTexto;
          if (tipoBusqueda === 'movie') {
            categoriaTexto = 'Película';
          } else {
            categoriaTexto = 'Serie';
          }

          let fechaTexto;
          if (fecha) {
            fechaTexto = fecha;
          } else {
            fechaTexto = '';
          }

          cont.innerHTML +=
            '<article class="resultadoitem">' +
            '<a class="resultadolink" href="' + destino + '">' +
            '<img class="resultadoimg" src="' + poster + '" alt="' + nombre + '">' +
            '<div class="resultadoinfo">' +
            '<h2>' + nombre + '</h2>' +
            '<p class="categoria">' + categoriaTexto + '</p>' +
            '<p class="fecha">' + fechaTexto + '</p>' +
            '</div>' +
            '</a>' +
            '</article>';

          i = i + 1;
        }
      }
    })
    .catch(function () {
      cargando.style.display = 'none';
      cont.innerHTML = '<div class="sinresultados"><img src="./imagenes/warning.webp" alt="sin resultados"><p>Ocurrió un error al buscar. Intentalo de nuevo.</p></div>';
    });
}