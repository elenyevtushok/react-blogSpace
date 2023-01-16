import React, { useState, useEffect } from 'react'

export default function useFetch(url) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	function fetchData() {
		fetch(url)
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
				setIsPending(false);
				setError(error.message)
			})
	}

	useEffect(() => {
		fetchData()
	}, [url])

	return { data, isPending, error }
	
}


