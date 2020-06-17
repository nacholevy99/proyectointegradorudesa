// Js para procesar los resultados de búsqueda.

let queryString = location.search; //Capturamos la query string del navegador
console.log(queryString);

let searchParams = new URLSearchParams(queryString); //Obtenemos un objeto literal con toda la info de los parametros en la url
console.log(searchParams);

let albums = searchParams.get("albums"); //con el método get obtenenemos el valor del término a buscar. En este obtenenemos lo que escribió el usuario en el campo de busqueda cuyo "name" es "search" (name="search").
let artists = searchParams.get("artists"); //con el método get obtenenemos el valor del término a buscar. En este obtenenemos lo que escribió el usuario en el campo de busqueda cuyo "name" es "search" (name="search").
let radio = searchParams.get("radio");
let genres = searchParams.get("genres");
let proxy = 'https://cors-anywhere.herokuapp.com/';
let urlartist =  `${proxy}https://api.deezer.com/artist/${artists}`;
let urlalbum =  `${proxy}https://api.deezer.com/album/${albums}`;
let tracklist = `${proxy}https://api.deezer.com/artist/${artists}/top?limit=5`
let albumlist = `${proxy}https://api.deezer.com/artist/${artists}/albums`
let albumtracklist = `${proxy}https://api.deezer.com/album/${albums}/tracks`
let genre = `${proxy}https://api.deezer.com/genre/${genres}?limit=3`
let genreartists = `${proxy}https://api.deezer.com/genre/${genres}/artists?limit=5`
let genretracks = `${proxy}https://api.deezer.com/genre/${genres}/radios?limit=5`
let genreradio = `${proxy}https://api.deezer.com/radio/${radio}/tracks`
window.iframe = function(clicked_id) {
  let player = document.querySelector('iframe');
  player.src = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&layout=dark&size=medium&type=tracks&id=${clicked_id}app_id=1`;
};
if (genres) {
    fetch(genre)
        .then(function(response){
        return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let results = document.querySelector('.results');
            let resultados = datos;
            results.innerHTML += `<li style="color:white">Genre: ${resultados.name} <img src="${resultados.picture_big}" /></li>`
        })
        .catch(function(error){
            console.log(error);

        });
    fetch(genreartists)
        .then(function(response){
        return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let artists = document.querySelector('.artists');
            let resultados = datos.data;
            resultados.forEach(function(resultado){
              artists.innerHTML += `<li style="color:white">Top ARTISTS: <a href="detail.html?artists=${resultado.id}">${resultado.name}</a><img src="${resultado.picture_big}" /></li>`
            });
        })
        .catch(function(error){
            console.log(error);

        });
    fetch(genretracks)
        .then(function(response){
        return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let tracklist = document.querySelector('.tracklist');
            let resultados = datos.data;
            resultados.forEach(function(resultado){
              tracklist.innerHTML += `<li style="color:white"><a href="detail.html?radio=${resultado.id}">${resultado.title}</a><img src="${resultado.picture_big}" /></li>`
            });
        })
        .catch(function(error){
            console.log(error);

        });
}
if(radio) {
  fetch(genreradio)
      .then(function(response){
      return response.json();
      })
      .then(function(datos){
          //Resolver que hacemos con los datos.
          console.log(datos);
          let tracks = document.querySelector('.tracklist');
          let resultados = datos.data;
          resultados.forEach(function(resultado){
            tracks.innerHTML += `<li style="color:white">${resultado.title} By <a href="detail.html?artists=${resultado.artist.id}">${resultado.artist.name}</a> <button id="${resultado.id}" onclick="iframe(this.id)"></button></li>`
          });
      })
      .catch(function(error){
          console.log(error);

      });
}
if(artists) {
    fetch(urlartist)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let results = document.querySelector('.results');
            let resultados = datos;
            results.innerHTML += `<li>${resultados.name} <img src="${resultados.picture_big}" /></li>`
        })
        .catch(function(error){
            console.log(error);

        });
    fetch(tracklist)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let tracklist = document.querySelector('.tracklist');
            let resultados = datos.data;

            resultados.forEach(function(resultado){
                tracklist.innerHTML += `<li><font style="color:white;">${resultado.title}</font><button id="${resultado.id}" onclick="iframe(this.id)"></button></li>`
            });
        })
    .catch(function(error){
        console.log(error);

    });

    fetch(albumlist)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let results = document.querySelector('.results');
            let resultados = datos.data;

            resultados.forEach(function(resultado){
                results.innerHTML += `<img src="${resultado.cover_big}" /><br><li><a href="detail.html?albums=${resultado.id}"><button>${resultado.title}</button></a></li>`
            });


        })
        .catch(function(error){
            console.log(error);

        });
    }
if(albums) {
    fetch(urlalbum)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let results = document.querySelector('.results');
            let resultados = datos;
            results.innerHTML += `<li>${resultados.name} <img src="${resultados.cover_big}" /></li>`
        })
        .catch(function(error){
            console.log(error);

        });
    fetch(albumtracklist)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let tracklist = document.querySelector('.tracklist');
            let resultados = datos.data;

            resultados.forEach(function(resultado){
                tracklist.innerHTML += `<li><button>${resultado.title}</button><button id="${resultado.id}" onclick="iframe(this.id)"></button></li>`
            });
        })
    .catch(function(error){
        console.log(error);

    })
}
