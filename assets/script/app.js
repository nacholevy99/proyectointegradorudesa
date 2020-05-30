
const searchForm = document.querySelector('#search-form');
const searchResultEL = document.querySelector('#search-result-wrapper');
const albumsEl = document.querySelector('#search-albums');
const artistsEl = document.querySelector('#search-artists');
const tracksEl = document.querySelector('#search-tracks');
const errorEl = document.querySelector('#search-error');

// Buscar data basada en query string
const getData = async url => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
			'x-rapidapi-key': '5860b531a7msh3bd92ef36bbb87ep17062bjsneba0c800c401'
		}
	});

	if (!response.ok) {
		throw new Error('Response was not ok.');
	}

	return await response.json();
};

// resultado de busqueda artistas
const searchArtists = async search => {
	const artists = await getData(
		`https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=${search}`
	);

	if (artists.error) {
		throw new Error('Could not fetch artists.');
	}
	return artists;
};

// resultado de busqueda albumes
const searchAlbums = async search => {
	const albums = await getData(
		`https://deezerdevs-deezer.p.rapidapi.com/search/album?q=${search}`
	);

	if (albums.error) {
		throw new Error('Could not fetch albums.');
	}
	return albums;
};

// resultado de busqueda temas
const searchTracks = async search => {
	const tracks = await getData(
		`https://deezerdevs-deezer.p.rapidapi.com/search/track?q=${search}`
	);

	if (tracks.error) {
		throw new Error('Could not fetch tracks.');
	}
	return tracks;
};

// recolectar resultados totales , max 5 de cda uno
const searchAll = async search => {
	return {
		artists: await searchArtists(`${search}&limit=5`),
		albums: await searchAlbums(`${search}&limit=5`),
		tracks: await searchTracks(`${search}&limit=5`)
	};
};

// valor de busqueda data search
const saveSearch = search => {
	searchResultEL
		.querySelectorAll('header a')
		.forEach(a => a.setAttribute('data-search', search));
};

//buscar toda la data -artista
const getArtistInfo = async id => {
	const artist = await getData(
		`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`
	);
	const tracklist = await getData(
		`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}/top?limit=5`
	);
	let albums = await getData(
		`https://deezerdevs-deezer.p.rapidapi.com/search/album?q=${artist.name}`
	);
	albums = albums.data.filter(album => album.artist.id == id);

	return { artist, tracklist, albums };
};

// data de albumes
const getAlbumInfo = async id => {
	return await getData(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`);
};

// artistas relacionados
const renderArtistResult = artist => {
	artistsEl.querySelector('ul').innerHTML += `
		<li class="list-group-item list-group-item-dark">
			<img src="${artist.picture_medium}"
				class="mr-3 cover-img" alt="">
			<div>
				<p class="mb-0"><a href="#" data-artist="${artist.id}">${artist.name}</a></p>
				<p class="text-muted mb-0">Artist</a></p>
			</div>
		</li>`;
};

// albumes relacionados
const renderAlbumResult = album => {
	albumsEl.querySelector('ul').innerHTML += `
		<li class="list-group-item list-group-item-dark">
			<img src="${album.cover_medium}"
				class="mr-3 cover-img" alt="">
			<div>
				<p class="mb-0"><a href="#" data-album="${album.id}">${album.title}</a></p>
				<p class="text-muted mb-0"><a href="#" data-artist="${album.artist.id}">${album.artist.name}</a></p>
			</div>
		</li>`;
};

// temas relacionados
const renderTrackResult = track => {
	tracksEl.querySelector('ul').innerHTML += `
		<li class="list-group-item list-group-item-dark">
			<img src="${track.album.cover}"
				class="mr-3 cover-img" alt="">
			<div>
				<p class="mb-0">${track.title}</p>
				<p class="text-muted mb-0">
					<a href="#" data-artist="${track.artist.id}">${track.artist.name}</a>,
					<a href="#" data-album="${track.album.id}">${track.album.title}</a></p>
			</div>
		</li>`;
};


const renderTrackList = (tracks, el) => {

	el.querySelector('ul').innerHTML = '';

	// Add tracks to list
	tracks.forEach((track, i) => {
		let duration = moment.unix(track.duration).format('m:ss');
		el.querySelector('ul').innerHTML += `
			<li class="list-group-item list-group-item-dark list-group-item-small">
			<p class="mb-0"><span class="mr-2">${i + 1}.</span> ${track.title}</p>
			<p class="mb-0 text-muted">${duration}<i class="far fa-play-circle ml-4 text-white"></i></p>
			</li>`;
	});
};

//  album list
const renderAlbumList = (albums, el) => {
	albums.forEach(album => {
		el.querySelector('#discography').innerHTML += `
			<div>
				<a href="#" data-album="${album.id}">
				<img src="${album.cover_big}" data-album="${album.id}">
				</a>
			</div>`;
	});
};

// info album
const renderAlbumInfo = album => {
	const { artist, genres, tracks } = album;
	const albumEl = document.querySelector('#album');
	albumEl.querySelector('img').src = album.cover_big;
	albumEl.querySelector('#album-by').innerText = artist.name;
	albumEl.querySelector('#album-by').setAttribute('data-artist', artist.id);
	albumEl.querySelector('#album-released').innerText = album.release_date;
	albumEl.querySelector('#album-title').innerText = album.title;
	albumEl.querySelector('#album-genres').innerText = genres.data
		.map(genre => genre.name)
		.join(', ');

	renderTrackList(tracks.data, albumEl);

// mostrar elemento
	albumEl.classList.remove('d-none');
};

// info artista
const renderArtistInfo = ({ artist, tracklist, albums }) => {
	const artistEl = document.querySelector('#artist');
	artistEl.querySelector('img').src = artist.picture_xl;
	artistEl.querySelector('#fans').innerText = `${artist.nb_fan} fans`;
	artistEl.querySelector('h1').innerText = artist.name;
	artistEl.querySelector('#discography').innerHTML = '';

	renderTrackList(tracklist.data, artistEl);
	renderAlbumList(albums, artistEl);

	//muestra elemento
	artistEl.classList.remove('d-none');
};

// Clear HTML 
const clearInfo = element => {
	const elements = document.querySelectorAll(element);
	elements.forEach(el => {
		el.innerHTML = '';
		if (el.tagName === 'IMG') el.src = '';
	});
};

// Add 'display none' 
const hideElements = () => {
	console.log('applying d-none to sections');
	document
		.querySelectorAll('section')
		.forEach(section => section.classList.add('d-none'));
};

const handleSearchResults = searchResults => {
	const { artists = false, albums = false, tracks = false } = searchResults;

	// If results contains artists
	if (artists && artists.total) {
		artistsEl.querySelector('ul').innerHTML = '';
		artistsEl.classList.remove('d-none');
		artists.data.forEach(artist => renderArtistResult(artist));
	}
	// If results contains albums
	if (albums && albums.total) {
		albumsEl.querySelector('ul').innerHTML = '';
		albumsEl.classList.remove('d-none');
		albums.data.forEach(album => renderAlbumResult(album));
	}
	// If results contains tracks
	if (tracks && tracks.total) {
		tracksEl.querySelector('ul').innerHTML = '';
		tracksEl.classList.remove('d-none');
		tracks.data.forEach(track => renderTrackResult(track));
	}
	// If no results to show
	if (!(artists.total || albums.total || tracks.total)) {
		errorEl.classList.remove('d-none');
		errorEl.innerHTML = 'Nothing to display';
	}
};

// Handle error
const handleError = err => {
	errorEl.classList.remove('d-none');
	errorEl.innerHTML = `<div class="alert alert-danger">Error: ${err}</div>`;
};

searchForm.addEventListener('submit', e => {
	// Prevent default action
	e.preventDefault();

	// Get search value
	const search = searchForm.search.value.trim().toLowerCase();
	saveSearch(search);

	// Reset page
	searchForm.reset();
	hideElements();

	// Search based on user input and handle results
	searchAll(search)
		.then(handleSearchResults)
		.catch(handleError);
});

document.querySelector('main').addEventListener('click', async e => {
	// Prevent default 
	e.preventDefault();

	// Return if clicked element or parent element is not an a-tag
	if (!(e.target.tagName === 'A' || e.target.parentElement.tagName === 'A')) {
		return;
	}

	// Add 'display none' to all section elements
	hideElements();

	// Check  'search'
	if (e.target.dataset.search) {
		const search = e.target.dataset.search;
		const type = e.target.dataset.type;

		//  all search results 
		switch (type) {
			case 'artist':
				searchArtists(search)
					.then(res => handleSearchResults({ artists: res }))
					.catch(handleError);
				break;
			case 'album':
				searchAlbums(search)
					.then(res => handleSearchResults({ albums: res }))
					.catch(handleError);
				break;
			case 'track':
				searchTracks(search)
					.then(res => handleSearchResults({ tracks: res }))
					.catch(handleError);
				break;
		}
	}

	// Check  'artist'
	if (e.target.dataset.artist) {
		// Remove previous info
		clearInfo('.artist-info');

		// Get artist info
		getArtistInfo(e.target.dataset.artist)
			.then(renderArtistInfo)
			.catch(handleError);
	}

	// Check if element has data attribute 'album'
	if (e.target.dataset.album) {
		// Remove previous info
		clearInfo('.album-info');

		// Get album info 
		getAlbumInfo(e.target.dataset.album)
			.then(renderAlbumInfo)
			.catch(handleError);
	}
});
