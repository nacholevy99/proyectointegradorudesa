// Js para procesar los resultados de búsqueda.

let queryString = location.search; //Capturamos la query string del navegador
console.log(queryString);

let searchParams = new URLSearchParams(queryString); //Obtenemos un objeto literal con toda la info de los parametros en la url
console.log(searchParams);

let albums = searchParams.get("albums"); //con el método get obtenenemos el valor del término a buscar. En este obtenenemos lo que escribió el usuario en el campo de busqueda cuyo "name" es "search" (name="search").
let artists = searchParams.get("artists"); //con el método get obtenenemos el valor del término a buscar. En este obtenenemos lo que escribió el usuario en el campo de busqueda cuyo "name" es "search" (name="search").
let genres = searchParams.get("genres");
let proxy = 'https://cors-anywhere.herokuapp.com/';
let urlartist =  `${proxy}https://api.deezer.com/artist/${artists}`;
let urlalbum =  `${proxy}https://api.deezer.com/album/${albums}`;
let tracklist = `${proxy}https://api.deezer.com/artist/${artists}/top?limit=50`
let albumlist = `${proxy}https://api.deezer.com/artist/${artists}/albums`
let albumtracklist= `${proxy}https://api.deezer.com/album/${albums}/tracks`
let genre= `${proxy}https://api.deezer.com/genre/${genres}`
if (genres) {
    fetch(genres)
        .then(function(response){
        return response.json();
        })
        .then(function(datos){
            //Resolver que hacemos con los datos.
            console.log(datos);
            let results = document.querySelector('.results');
            let resultados = datos.data;
            results.innerHTML += `<li>${resultados.title} <img src="${resultados.picture_big}" /></li>` 
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
                tracklist.innerHTML += `<li><button>${resultado.title}</button></li>`
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
                results.innerHTML += `<img src="${resultado.cover_big}" /><br><li><a href="detail.html?albums=${resultado.id}"<button>${resultado.title}</button></li>`
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
                tracklist.innerHTML += `<li><button>${resultado.title}</button></li>`
            });  
        })
    .catch(function(error){
        console.log(error);
        
    })
}