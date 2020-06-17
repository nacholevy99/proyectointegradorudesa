let proxy = 'https://cors-anywhere.herokuapp.com/';
let tracks = 'https://api.deezer.com/chart/0/tracks&limit=3'

fetch(tracks)
     .then(function(response){
         return response.json})
         .then
