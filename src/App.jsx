import { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Home from './Home';

function App() {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState({ title: "", body: "" })

	function handleChange(event) {
		const { name, value } = event.target
		setNewPost(prevNewPost => {
			return {
				...prevNewPost,
				[name]: value,
			}
		})
	}
	function handleClick(event){
		event.preventDefault();

		const options = {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Content-Type": "application/json"
			}
		}

		fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
			.then(res => res.json())
			.then(newPost => {
				console.log(newPost)
			})
	}

	function fetchPosts() {
		fetch("https://apis.scrimba.com/jsonplaceholder/posts")
			.then(res => res.json())
			.then(data => setPosts(data))
	}
	useEffect(() => {
		fetchPosts()
	}, [])

	return (
		<div className='App'>
			<Navbar />
			<div className='content'>
			<Home />
			<form>
				<label htmlFor="post-title">Title:</label>
				<input
					id="post-title"
					type="text"
					name='title'
					value={newPost.title}
					onChange = {handleChange}
				/>
				<label htmlFor="post-body">Body:</label>
				<textarea
					id="post-body"
					name='body'
					value={newPost.body}
					onChange={handleChange}
				/>
				<button onClick ={handleClick}>Post</button>
			</form>
			{posts.map(post => {
				return (
					<div key = {post.title} id="blog-list">
						<h4>Title:{post.title}</h4>
						<p>Post:{post.body}</p>
						<hr />
					</div>
				)
			})}
			</div>
		</div>
	)
}

export default App
