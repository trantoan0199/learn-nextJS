import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import * as React from 'react'

export interface PostListPageProps {
	posts: any[]
}

export default function PostListPage({ posts }: PostListPageProps) {
	return (
		<div>
			<h1>Post List Page</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/posts/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
	context: GetStaticPropsContext
) => {
	//server-side
	//run khi build - time
	const response = await fetch('https://62f06e9fe2bca93cd236ee67.mockapi.io/nextjs?page=1&limit=10')
	const data = await response.json()

	return {
		props: {
			posts: data.map((x: any) => ({ id: x.id, title: x.name })),
		},
	}
}
