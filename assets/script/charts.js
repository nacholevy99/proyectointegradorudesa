//Top charts para index//

let proxy = 'https://cors-anywhere.herokuapp.com/';
let url =  proxy + "https://api.deezer.com/chart/0/tracks?limit=9";
let urlalbum = proxy + "https://api.deezer.com/chart/0/albums?limit=9"
let urlartist = proxy + "https://api.deezer.com/chart/0/artists?limit=9"


fetch(url) 
    .then(function(response){
        return response.json();
    })

    .then(function(datos){
        console.log(datos);

         let tracks = document.querySelector('.tracks');
         let resultados = datos.data;

        resultados.forEach(function(track){
                tracks.innerHTML += '<li>' + '<a href="detail.html?track=' 
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
    
             let artists = document.querySelector('.artists1');
             let resultados = datos.data;
    
            resultados.forEach(function(artist){
                    artists.innerHTML += '<li>' + '<a href="detail.html?artists=' 
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
                    albums.innerHTML += '<li>' + '<a href="detail.html?albums=' 
                    + album.id + '">' + album.title + '</a></li>'
    
                })
    
    
            })
    
            .catch(function(error){
                console.log(error);
            })