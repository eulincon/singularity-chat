import { Box, Button, Icon, Image, Text, TextField } from '@skynexui/components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import appConfig from '../config.json'

function Titulo(props) {
	const Tag = props.tag || 'h1'
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx>{`
				${Tag} {
					color: ${appConfig.theme.colors.neutrals['000']};
					font-size: 24px;
					font-weight: 600;
				}
			`}</style>
		</>
	)
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
	const [username, setUsername] = useState('zlincon')
	const [followers, setFollowers] = useState('')
	const [following, setFollowing] = useState('')
	const [githubApi, setGithubApi] = useState<GithubApi>({
		name: null,
		followers_url: null,
		following_url: null,
	})
	const router = useRouter()

	useEffect(() => {
		fetch(`https://api.github.com/users/${username}`)
			.then(async (res) => await res.json())
			.then((res) => {
				setGithubApi(res)
			})
			.then(() => {
				githubApi.followers_url &&
					fetch(`${githubApi.followers_url}`)
						.then(async (res) => await res.json())
						.then((res) => {
							setFollowers(res.length)
						})
				githubApi.following_url &&
					fetch(`${githubApi.following_url.replace('{/other_user}', '')}`)
						.then(async (res) => await res.json())
						.then((res) => {
							setFollowing(res.length)
						})
			})
	}, [username])

	return (
		<>
			<Box
				styleSheet={
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: appConfig.theme.colors.neutrals[800],
						backgroundImage:
							'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/earthrise-1536x864.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundBlendMode: 'multiply',
					} as any
				}
			>
				<Box
					styleSheet={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						flexDirection: {
							xs: 'column',
							sm: 'row',
						},
						width: '100%',
						maxWidth: '700px',
						borderRadius: '5px',
						padding: '32px',
						margin: '16px',
						boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
						backgroundColor: appConfig.theme.colors.neutrals[700],
						border: '1px solid',
						borderColor: appConfig.theme.colors.neutrals[999],
					}}
				>
					{/* Formulário */}
					<Box
						tag='form'
						// @ts-ignore: Unreachable code error
						onSubmit={(event) => {
							event.preventDefault()
							router.push('/chat')
						}}
						styleSheet={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							width: { xs: '100%', sm: '50%' },
							textAlign: 'center',
							marginBottom: '32px',
						}}
					>
						<Titulo tag='h2'>Boas vindas de volta!</Titulo>
						<Text
							variant='body3'
							styleSheet={{
								marginBottom: '32px',
								color: appConfig.theme.colors.neutrals[300],
							}}
						>
							{appConfig.name}
						</Text>

						<TextField
							fullWidth
							value={username}
							onChange={(event) => {
								setUsername(event.target.value)
							}}
							textFieldColors={
								{
									neutral: {
										textColor: appConfig.theme.colors.neutrals[200],
										mainColor: appConfig.theme.colors.neutrals[900],
										mainColorHighlight: appConfig.theme.colors.primary[500],
										backgroundColor: appConfig.theme.colors.neutrals[800],
									},
								} as any
							}
							name=''
						/>
						<Button
							type='submit'
							label='Entrar'
							disabled={username.length < 3}
							fullWidth
							buttonColors={{
								contrastColor: appConfig.theme.colors.neutrals['000'],
								mainColor: appConfig.theme.colors.primary[500],
								mainColorLight: appConfig.theme.colors.primary[400],
								mainColorStrong: appConfig.theme.colors.primary[600],
							}}
						/>
					</Box>
					{/* Formulário */}

					{/* Photo Area */}
					<Box
						styleSheet={
							{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								maxWidth: '220px',
								padding: '16px',
								backgroundColor: appConfig.theme.colors.neutrals[800],
								border: '1px solid',
								borderColor: appConfig.theme.colors.neutrals[999],
								borderRadius: '10px',
								flex: 1,
								minHeight: '240px',
							} as any
						}
					>
						<Image
							styleSheet={{
								borderRadius: '50%',
								marginBottom: '16px',
							}}
							src={`https://github.com/${username}.png`}
						/>
						{/* <Text
							variant='body4'
							styleSheet={{
								color: appConfig.theme.colors.neutrals[200],
								backgroundColor: appConfig.theme.colors.neutrals[900],
								padding: '3px 10px',
								borderRadius: '1000px',
							}}
						>
							{username}
						</Text> */}

						{githubApi.name && (
							<>
								<Box
									styleSheet={
										{
											backgroundColor: appConfig.theme.colors.neutrals[800],
											border: '1px solid',
											margin: '1rem',
											width: '100%',
											borderColor: appConfig.theme.colors.neutrals[400],
										} as any
									}
								>
									{' '}
								</Box>
								<Text
									variant='body4'
									styleSheet={{
										color: appConfig.theme.colors.neutrals[200],
										backgroundColor: appConfig.theme.colors.neutrals[900],
										padding: '3px 10px',
										borderRadius: '1000px',
										marginBottom: '0.5rem',
									}}
								>
									{githubApi.name}
								</Text>
								<Icon name='FaUserFriends' styleSheet={{ color: 'white' }} />
								<Text
									variant='body4'
									styleSheet={{
										color: appConfig.theme.colors.neutrals[200],
									}}
								>
									{following}
									{following == '30' && '+'} followings | {followers}
									{followers == '30' && '+'} followers
								</Text>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</>
	)
}

type GithubApi = {
	name: string
	followers_url: string
	following_url: string
}
