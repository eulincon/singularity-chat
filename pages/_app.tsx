import Head from 'next/head'

function GlobalStyle() {
	return (
		<style global jsx>{`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				list-style: none;
			}
			body {
				font-family: 'Open Sans', sans-serif;
			}
			/* App fit Height */
			html,
			body,
			#__next {
				min-height: 100vh;
				display: flex;
				flex: 1;
			}
			#__next {
				flex: 1;
			}
			#__next > * {
				flex: 1;
			}
			/* ./App fit Height */
		`}</style>
	)
}

export default function CystomApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Singularity</title>
				<link
					rel='icon'
					href='https://img.icons8.com/color/48/000000/chat--v1.png'
				></link>
			</Head>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	)
}
