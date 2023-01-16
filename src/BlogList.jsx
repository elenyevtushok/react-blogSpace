import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogList(props) {
	return (
		<div className='blog-list'>
			<h2>{props.title}</h2>
			{props.posts.map(post => {
				return (
					<div key={post.id} id="blog-list" className='blog-preview'>
						<Link to={`/blogs/${post.id}`}>
							<h2>Title: {post.title}</h2>
							<div>Author: {post.userId}</div>
							<p>Post: {post.body}</p>
						</Link>
					</div>
				)
			})}
		</div>
	)
}
