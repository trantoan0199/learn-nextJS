import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	const router = useRouter()

	const goToDetailPage = () => {
		router.push({
			pathname: '/posts/[postId]',
			query: {
				postId: '123',
				ref: 'social',
			},
		})
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Lean NextJS | Trần Toản</title>
				<meta name="description" content="Learn nextJS + Typescript" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>

				<Link href="/about">
					<a>Go to about</a>
				</Link>

				<button onClick={goToDetailPage}>Go to post details page</button>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}

export default Home
