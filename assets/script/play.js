// Playlist

let recuperoStorage = localStorage.getItem('playlist');
let playlist = JSON.parse(recuperoStorage);

let playlistWrapper = document.querySelector('.playlistWrapper');
console.log(recuperoStorage);
if(recuperoStorage == null || recuperoStorage == "[]"){
    playlist = [];
    playlistWrapper.innerHTML += '<li> No hay canciones en tu playlist </li>'
    console.log(playlistWrapper);

} else {

    playlist.forEach(function(id){
        buscarYMostrarTrack(id);
    });
}

function buscarYMostrarTrack(id){
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = proxy + 'https://api.deezer.com/track/' + id;
    
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (track) {
            playlistWrapper.innerHTML += '<li id="'+ id +'&" onclick="iframe(this.id)">' + track.title + '</li><button id="'+ id +'" class="agregar" onclick="add(this.id)"></button>'
        window.iframe = function(clicked_id) {
        let player = document.querySelector('iframe');
        player.src = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&layout=dark&size=medium&type=tracks&id=` + clicked_id + `app_id=1`;
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

        };
        
        })
        .catch(function(errors){
            console.log(errors);

        })
};

