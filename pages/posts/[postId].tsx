/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostPageProps {
	post: any
}

export default function PostDetailPage({ post }: PostPageProps) {
	const router = useRouter()
	if (!post) return null
	return (
		<div>
			<h1>Post Detail Page</h1>
			<p>{post.name}</p>
			<p>{post.createdAt}</p>
			<img src={post.avatar} alt={post.name} />
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	console.log('\nGET STATIC PATH')
	const response = await fetch('https://62f06e9fe2bca93cd236ee67.mockapi.io/nextjs?page=1&limit=10')
	const data = await response.json()

	return {
		paths: data.map((post: any) => ({ params: { postId: post.id } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (
	context: GetStaticPropsContext
) => {
	//server-side
	//run khi build - time
	console.log('\nGET STATIC PROPS', context.params?.postId)
	const postId = context.params?.postId
	if (!postId) return { notFound: true }
	const response = await fetch(`https://62f06e9fe2bca93cd236ee67.mockapi.io/nextjs/${postId}`)
	const data = await response.json()

	return {
		props: {
			post: data,
		},
	}
}
