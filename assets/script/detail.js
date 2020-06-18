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
let urltracks = proxy + "https://api.deezer.com/track/" + idTrack
window.iframe = function(clicked_id) {
  let player = document.querySelector('iframe');
  player.src = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&layout=dark&size=medium&type=tracks&id=${clicked_id}app_id=1`;
};
window.add = function(clicked_id) {
    //playlist
    let recuperoStorage = localStorage.getItem('playlist');

    //Si todavía no tengo tracks en mi playlist
    if(recuperoStorage == null){
        //Creo una lista vacía
        playlist = [];
    } else {
        //Recupero el array de localStorage
        playlist = JSON.parse(recuperoStorage);
    }

    //Me fijo que no esté en la lista y cambio el texto del botón
    if(playlist.includes(clicked_id)){
        document.getElementById(clicked_id).innerHTML = "Quitar de la playlist";
    }

    //Paso 2: agregar un track a la playlist.
    let agregar = document.getElementById(clicked_id);

    agregar.addEventListener('click', function(e){
        //Detener el comportamiento default de <a></a>
        e.preventDefault();

        if(playlist.includes(clicked_id)){
            //Si el track está tenemos que quitarlo.
            let indiceEnElArray = playlist.indexOf(clicked_id);
            playlist.splice(indiceEnElArray, 1);
            document.getElementById(clicked_id ).innerHTML = "Agregar a playlist";
            console.log(playlist);

        } else {
            //Agrego el id del track a la lista
            playlist.push(clicked_id);
            document.getElementById(clicked_id).innerHTML = "Quitar de la playlist"
        }
        //


        //Paso 3 guardar lista en localStorage
        let playlistParaStorage = JSON.stringify(playlist);
        localStorage.setItem('playlist', playlistParaStorage);
        console.log(localStorage);
        });

    }
//DETALLE DE GENEROS
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
//fin detalle generos
//detailtracks
fetch(urltracks)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        console.log(datos);

        //Resolvemos qué hacemos con los datos
        let titulo = document.querySelector('.titulo');
        titulo.innerHTML += datos.title;

        let interprete = document.querySelector('.interprete');
        interprete.innerHTML += datos.artist.name

        let album = document.querySelector('.album');
        album.innerHTML += datos.album.title

        //Aquí agregamos el player.
        let player = document.querySelector('iframe');
        player.src = 'https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id=' + idTrack + '&app_id=1'


    })
    .catch(function (error) {
        console.log(error);

    })


//Pasos para agregar temas a una playlist
//Paso 1: recuperar datos del storage

let recuperoStorage = localStorage.getItem('playlist');

//Si todavía no tengo tracks en mi playlist
if(recuperoStorage == null){
    //Creo una lista vacía
    playlist = [];
} else {
    //Recupero el array de localStorage
    playlist = JSON.parse(recuperoStorage);
}

//Me fijo que no esté en la lista y cambio el texto del botón
if(playlist.includes(idTrack)){
    document.querySelector('.agregar').innerHTML = "Quitar de la playlist";
}

//Paso 2: agregar un track a la playlist.
let agregar = document.querySelector('.agregar');

agregar.addEventListener('click', function(e){
    //Detener el comportamiento default de <a></a>
    e.preventDefault();

    if(playlist.includes(idTrack)){
        //Si el track está tenemos que quitarlo.
        let indiceEnElArray = playlist.indexOf(idTrack);
        playlist.splice(indiceEnElArray, 1);
        document.querySelector('.agregar').innerHTML = "Agregar a playlist";
        console.log(playlist);

    } else {
        //Agrego el id del track a la lista
        playlist.push(idTrack);
        document.querySelector('.agregar').innerHTML = "Quitar de la playlist"
    }
    //


    //Paso 3 guardar lista en localStorage
    let playlistParaStorage = JSON.stringify(playlist);
    localStorage.setItem('playlist', playlistParaStorage);
    console.log(localStorage);


})

//Detalle de artistas
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
            results.innerHTML += `<li>${resultados.name} <img class="fotoartista" src="${resultados.picture_big}" /></li>`
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
                lista.innerHTML += `<li>${resultado.title} By <a href="detail.html?artists=${resultado.artist.id}"> ${resultado.artist.name}</a>
                <button id="${resultado.id}" onclick="iframe(this.id)"></button>
                </li><button class="agregar" id="${resultado.id} " onclick="add(this.id)"></button>`;
    
        
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
    //fin detalle artistas
    // Detalle de albumes
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
