import { Box, Button, Image, Text, TextField } from '@skynexui/components'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

export default function PaginaInicial() {
	const [username, setUsername] = useState('')
	const router = useRouter()

	// useEffect(() => {
	// }, [username])

	// const getGithubInfo = () => {
	// 	setTimeout(() => {
	// 		//your code to be executed after 1 second
	// 		console.log('Catch here')
	// 		githubApi.followers_url &&
	// 			fetch(`${githubApi.followers_url}`)
	// 				.then(async (res) => await res.json())
	// 				.then((res) => {
	// 					console.log(githubApi.followers_url)
	// 					setFollowers(res.length)
	// 				})
	// 		githubApi.following_url &&
	// 			fetch(`${githubApi.following_url.replace('{/other_user}', '')}`)
	// 				.then(async (res) => await res.json())
	// 				.then((res) => {
	// 					console.log(githubApi.following_url)
	// 					setFollowing(res.length)
	// 				})
	// 	}, timeout)
	// }

	return (
		<>
			<Box
				styleSheet={
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						// backgroundColor: appConfig.theme.colors.neutrals[800],
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
						boxShadow: '0 2px 10px 0 rgb(0 0 0 / 100%)',
						backgroundColor: appConfig.theme.colors.neutrals[700],
						opacity: '0.8',
						// backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
							router.push(`/chat?username=${username}`)
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
							Singularity
						</Text>

						<TextField
							fullWidth
							value={username}
							// @ts-ignore: Unreachable code error
							onKeyUp={(event) => {
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

						{username && (
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
									{username}
								</Text>
							</>
						)}
						{/* {following && (
							<>
								<Icon name='FaUserFriends' styleSheet={{ color: 'white' }} />
								<Text
									variant='body4'
									styleSheet={{
										color: appConfig.theme.colors.neutrals[200],
									}}
								>
									{followers}
									{following == '30' && '+'} followings | {followers}
									{followers == '30' && '+'} followers
								</Text>
							</>
						)} */}
					</Box>
				</Box>
			</Box>
		</>
	)
}
