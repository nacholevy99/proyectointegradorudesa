//Top charts para index//

let proxy = 'https://cors-anywhere.herokuapp.com/';
let url =  proxy + "https://api.deezer.com/chart/0/tracks";


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