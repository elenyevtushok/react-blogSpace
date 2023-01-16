import React, { useState, useEffect } from 'react'
import BlogList from './BlogList';
import useFetch from './useFetch';

export default function Home() {
	const { data: posts, isPending, error } = useFetch('http://localhost:8000/blogs');

	return (
		<div className='home'>
			{error && <div>{error}</div>}
			{isPending && <div>Loading...</div>}
			{posts && <BlogList posts={posts} title="All Blogs!" />}
		</div>
	)
}
