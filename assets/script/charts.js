//Top charts para index//

let proxy = 'https://cors-anywhere.herokuapp.com/';
let url =  proxy + "https://api.deezer.com/chart/0/tracks";
let urlalbum = proxy + "https://api.deezer.com/chart/0/albums"
let urlartist = proxy + "https://api.deezer.com/chart/0/artists"


fetch(url) 
    .then(function(response){
        return response.json();
    })

    .then(function(datos){
        console.log(datos);

         let tracks = document.querySelector('.tracks');
         let resultados = datos.data;

        resultados.forEach(function(track){
                tracks.innerHTML += '<li>' + '<a href="track.html?id=' 
                + track.id + '">' + track.title + '</a></li>'

            })


        })

        .catch(function(error){
            console.log(error);
        })


//ARTIST//
 fetch(urlartist) 
        .then(function(response){
            return response.json();
        })
    
        .then(function(datos){
            console.log(datos);
    
             let artists = document.querySelector('.artists');
             let resultados = datos.data;
    
            resultados.forEach(function(artist){
                    artists.innerHTML += '<li>' + '<a href="artist.html?id=' 
                    + artist.id + '">' + artist.name + '</a></li>'
    
                })
    
    
            })
    
            .catch(function(error){
                console.log(error);
            })



//ALBUM//

fetch(urlalbum) 
        .then(function(response){
            return response.json();
        })
    
        .then(function(datos){
            console.log(datos);
    
             let albums = document.querySelector('.albums');
             let resultados = datos.data;
    
            resultados.forEach(function(album){
                    albums.innerHTML += '<li>' + '<a href="album.html?id=' 
                    + album.id + '">' + album.title + '</a></li>'
    
                })
    
    
            })
    
            .catch(function(error){
                console.log(error);
            })