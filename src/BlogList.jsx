import React from 'react'

export default function BlogList(props) {
	return (
		<div className='blog-list'>
			<h2>{props.title}</h2>
			{props.posts.map(post => {
				return (
					<div key={post.id} id="blog-list" className='blog-preview'>
						<h2>Title:{post.title}</h2>
						<p>Post:{post.body}</p>
						<hr />
					</div>
				)
			})}
		</div>
	)
}
