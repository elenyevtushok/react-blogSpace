import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetch from './useFetch';

export default function BlogDetails() {
	const { id } = useParams();
	const { data: post, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
	const history = useHistory();

	function handleDelete(){
		fetch('http://localhost:8000/blogs/' + post.id,
			{
				method: "DELETE",
			})
			.then(() =>
			{
				history.push('/');
			})
	}
	return (
		<div className='blog-details'>
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{post && (
				<article>
					<h2>{post.title}</h2>
					<div>Written by: {post.userId}</div>
					<p>{post.body}</p>
					<button onClick ={handleDelete}>Delete</button>
				</article>
			)}
		</div>
	)
}
