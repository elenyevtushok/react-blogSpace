import React, { useState, useEffect } from 'react'

export default function useFetch(url) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();
		fetch(url, { signal: abortCont.signal })
			.then(res => {
				if (!res.ok) {
					throw Error('Could not fetch the data for that resourse')
				}
				return res.json();
			})
			.then(data => {
				setIsPending(false);
				setData(data);
				setError(null)
			})
			.catch(error => {
				if(error.name === "AbortError"){
					console.log('fetch aborted')
				}else{
				setIsPending(false);
				setError(error.message)
				}
			});

		return () => abortCont.abort();

	}, [url])

	return { data, isPending, error }
	
}


