const getGenretInfo = async id => {
	const genre = await getData(
		`https://api.deezer.com/genre/${id}`
	);
	const tracks = await getData(
        `https://api.deezer.com/track//${id}/top?limit=5`
    );
	
	return {genre, tracks };
};