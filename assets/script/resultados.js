// Js para procesar los resultados de búsqueda.

let queryString = location.search; //Capturamos la query string del navegador
console.log(queryString);

let searchParams = new URLSearchParams(queryString); //Obtenemos un objeto literal con toda la info de los parametros en la url
console.log(searchParams);

let search = searchParams.get("search"); //con el método get obtenenemos el valor del término a buscar. En este obtenenemos lo que escribió el usuario en el campo de busqueda cuyo "name" es "search" (name="search").
console.log(search);
let proxy = 'https://cors-anywhere.herokuapp.com/';
let url =  `${proxy}https://api.deezer.com/search?q=${search}&limit=5`;
let urlartist = `${proxy}https://api.deezer.com/search/artist?q=${search}&limit=5`;
let urlalbum = `${proxy}https://api.deezer.com/search/album?q=${search}&limit=5`;
window.iframe = function(clicked_id) {
    let player = document.querySelector('iframe');
    player.src = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&layout=dark&size=medium&type=tracks&id=${clicked_id}app_id=1`;
  };
fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        //Resolver que hacemos con los datoss//
        console.log(datos);
        let lista = document.querySelector('.lista');
        let resultados = datos.data;

       //Tracks, linea 29 boton para escuchar la musica//
        resultados.forEach(function(resultado){
            lista.innerHTML += `<li>${resultado.title} By <a href="detail.html?artists=${resultado.artist.id}"> ${resultado.artist.name}</a>
            <button id="${resultado.id}" onclick="iframe(this.id)"></button>
            </li><button class="agregar" id="${resultado.id}`+ `" onclick="add(this.id)"></button>`;
            window.add=function(clicked_id){
                "agregar a playlist"
            }
           
           
        });


    })
    .catch(function(error){
        console.log(error);

    });
fetch(urlartist)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        //Resolver que hacemos con los datos.
        console.log(datos);
        let artistas = document.querySelector('.artistas');
        let resultados = datos.data;

        resultados.forEach(function(resultado){
            artistas.innerHTML += `<li><a href="detail.html?artists=${resultado.id}"> ${resultado.name}</a></li>`
        });


    })
    .catch(function(error){
        console.log(error);

    });
fetch(urlalbum)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        //Resolver que hacemos con los datos.
        console.log(datos);
        let albumes = document.querySelector('.albumes');
        let resultados = datos.data;

        resultados.forEach(function(resultado){
            albumes.innerHTML += `<li><a href="detail.html?albums=${resultado.id}">${resultado.title}</a></li>`
        });
    })
    .catch(function(error){
        console.log(error);

    });
