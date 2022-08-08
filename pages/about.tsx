import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

//Chỉ muốn render bên phía client, không render bên phía server
const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const [postList, setPostList] = useState([])

	const router = useRouter()

	const page = router.query?.page

	useEffect(() => {
		if (!page) return
		;(async () => {
			const response = await fetch(
				`https://62f06e9fe2bca93cd236ee67.mockapi.io/nextjs?page=${page}`
			)
			const data = await response.json()
			setPostList(data)
		})()
	}, [page])
	function handleNextClick() {
		router.push(
			{
				pathname: '/about',
				query: {
					page: Number(page || 1) + 1,
				},
			},
			undefined,
			{ shallow: true }
		)
	}
	return (
		<div>
			<h1>About Page</h1>
			<Header />
			<ul className="post-list">
				{postList.map((post: any) => (
					<li key={post.id}>{post.name}</li>
				))}
			</ul>
			<button onClick={handleNextClick}>Next Page</button>
		</div>
	)
}

export async function getStaticProps() {
	console.log('get static props')
	return {
		props: {},
	}
}
// export async function getServerSideProps() {
// 	return {
// 		props: {},
// 	}
// }
