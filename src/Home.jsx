import React, { useState, useEffect } from 'react'
import BlogList from './BlogList';

export default function Home() {
	const [posts, setPosts] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	function fetchPosts() {
		fetch("http://localhost:8000/blogs")
			.then(res => {
				if (!res.ok) {
					throw Error('Could not fetch the data for that resourse')
				}
				return res.json();
			})
			.then(data => {
				setIsPending(false);
				setPosts(data);
				setError(null)
			})
			.catch(error => {
				setIsPending(false);
				setError(error.message)
			})
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	return (
		<div className='home'>
			{error && <div>{error}</div>}
			{isPending && <div>Loading...</div>}
			{posts && <BlogList posts={posts} title="All Blogs!" />}
		</div>
	)
}
