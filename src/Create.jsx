import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Create() {
	const [newPost, setNewPost] = useState({
		title: "",
		userId: 1,
		body: "",
	});
	const [isPending, setIsPending] = useState(false);

	const history = useHistory();

	function handleSubmit(event) {
		event.preventDefault();

		setIsPending(true)

		fetch('http://localhost:8000/blogs',
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newPost)
			})
			.then(() => {
				console.log(newPost);
				setIsPending(false)
				history.push('/')
			})

			

	}
	function handleChange(event) {
		setNewPost(prevNewPost => {
			return {
				...prevNewPost,
				[event.target.name]: event.target.value
			}
		})
	}
	return (
		<div className='create'>
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog title:</label>
				<input
					type="text"
					name='title'
					required
					value={newPost.title}
					onChange={handleChange} />
				<label>Blog body:</label>
				<textarea
					name='body'
					required
					value={newPost.body}
					onChange={handleChange} >
				</textarea>
				<label>Author:</label>
				<select
					name='userId'
					value={newPost.userId}
					onChange={handleChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
				{!isPending && <button>Add post</button>}
				{isPending && <button disabled>Adding post...</button>}
			</form>
		</div>
	)
}
