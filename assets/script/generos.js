let proxy = 'https://cors-anywhere.herokuapp.com/';
let url =  `${proxy}https://api.deezer.com/genre`;

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        //Resolver que hacemos con los datos.
        console.log(datos);
        let generos = document.querySelector('.generos');
        let resultados = datos.data;

        resultados.forEach(function(resultado){
            generos.innerHTML += `<a href="detail.html?genres=${resultado.id}" style="text-decoration: none">
            <div class="grid-item">${resultado.name}</div></a>`
        });


    })
    .catch(function(error){
        console.log(error);

    });
