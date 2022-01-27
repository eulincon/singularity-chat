import { Box, Button, Image, Text, TextField } from '@skynexui/components'
import React, { useState } from 'react'
import 'react-dropdown/style.css'
import ModalRemoveMessage from '../components/ModalRemoveMessage'
import appConfig from '../config.json'

type messageType = {
	text: string
	id: number
	from: string
}

export default function ChatPage() {
	const [message, setMessage] = useState('')
	const [messageList, setMessageList] = useState<messageType[]>([])

	const handleNewMessage = (newMessage: string) => {
		const message = {
			id: messageList.length + 1,
			from: 'zlincon',
			text: newMessage,
		}
		setMessageList([message, ...messageList])
		setMessage('')
	}

	const removeMessage = (id: number) => {
		const newMessageList = messageList.filter((message) => message.id != id)
		setMessageList([...newMessageList])
	}

	return (
		<Box
			styleSheet={
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: appConfig.theme.colors.neutrals[400],
					backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/earthrise-1536x864.jpg)`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundBlendMode: 'multiply',
					color: appConfig.theme.colors.neutrals['000'],
				} as any
			}
		>
			<Box
				styleSheet={
					{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
						borderRadius: '5px',
						backgroundColor: appConfig.theme.colors.neutrals[700],
						height: '100%',
						maxWidth: '95%',
						maxHeight: '95vh',
						padding: '32px',
					} as any
				}
			>
				<Header />
				<Box
					styleSheet={{
						position: 'relative',
						display: 'flex',
						flex: 1,
						height: '80%',
						backgroundColor: appConfig.theme.colors.neutrals[600],
						flexDirection: 'column',
						borderRadius: '5px',
						padding: '16px',
					}}
				>
					<MessageList messages={messageList} removeMessage={removeMessage} />

					<Box
						as='form'
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<TextField
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							onKeyPress={(event) => {
								if (event.key == 'Enter') {
									event.preventDefault()
									handleNewMessage(message)
								}
							}}
							placeholder='Insira sua mensagem aqui...'
							type='textarea'
							name=''
							styleSheet={
								{
									width: '96%',
									border: '0',
									resize: 'none',
									borderRadius: '5px',
									padding: '6px 8px',
									backgroundColor: appConfig.theme.colors.neutrals[800],
									marginRight: '12px',
									color: appConfig.theme.colors.neutrals[200],
								} as any
							}
						/>
						<Button
							type='submit'
							onClick={(event) => {
								event.preventDefault()
								handleNewMessage(message)
							}}
							label='>'
							disabled={!message.length}
							fullWidth
							buttonColors={{
								contrastColor: appConfig.theme.colors.neutrals['000'],
								mainColor: appConfig.theme.colors.primary[500],
								mainColorLight: appConfig.theme.colors.primary[400],
								mainColorStrong: appConfig.theme.colors.primary[600],
							}}
							styleSheet={{
								width: '3%',
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

function Header() {
	return (
		<>
			<Box
				styleSheet={{
					width: '100%',
					marginBottom: '16px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Text variant='heading5'>Chat</Text>
				<Button
					variant='tertiary'
					colorVariant='dark'
					label='Logout'
					href='/'
				/>
			</Box>
		</>
	)
}

type MessageListProps = {
	messages: messageType[]
	removeMessage: (id: number) => void
}

function MessageList({ messages, removeMessage }: MessageListProps) {
	console.log(messages)
	return (
		<Box
			tag='ul'
			styleSheet={{
				overflow: 'scroll',
				display: 'flex',
				flexDirection: 'column-reverse',
				flex: 1,
				color: appConfig.theme.colors.neutrals['000'],
				marginBottom: '16px',
			}}
		>
			{messages?.map((message) => {
				return (
					<Text
						key={message?.id}
						tag='li'
						styleSheet={{
							borderRadius: '5px',
							padding: '6px',
							marginBottom: '12px',
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[700],
							},
						}}
					>
						<Box
							styleSheet={{
								marginBottom: '8px',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Image
								styleSheet={{
									width: '20px',
									height: '20px',
									borderRadius: '50%',
									display: 'inline-block',
									marginRight: '8px',
								}}
								src={`https://github.com/zlincon.png`}
							/>
							<Text tag='strong'>{message?.from}</Text>
							<Text
								styleSheet={{
									fontSize: '10px',
									marginLeft: '8px',
									color: appConfig.theme.colors.neutrals[300],
								}}
								tag='span'
							>
								{new Date().toLocaleDateString()}
							</Text>
							<Box
								styleSheet={{
									width: '30px',
									height: '30px',
									borderRadius: '5px',
									marginLeft: 'auto',
								}}
							>
								<ModalRemoveMessage
									messageId={message.id}
									removeMessage={removeMessage}
								/>
							</Box>
						</Box>
						{message?.text}
					</Text>
				)
			})}
		</Box>
	)
}
