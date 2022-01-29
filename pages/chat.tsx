import { Box, Button, Image, Text, TextField } from '@skynexui/components'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import appConfig from '../config.json'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import Message from '../src/components/Message'
import Skel from '../src/components/Skel'

type messageType = {
	id?: number
	texto: string
	de: string
}

const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyOTkzNiwiZXhwIjoxOTU4OTA1OTM2fQ.x6JHwySYKNuBab4BjYaOPdc44djRLQEDlIW-w0yXy4A'
const SUPABASE_ANON_URL = 'https://bwolqsfbgqytdjdgdufi.supabase.co'
const supabaseClient = createClient(SUPABASE_ANON_URL, SUPABASE_ANON_KEY)

const listenRealTimeMessages = (addMessage, removeMessage) => {
	return supabaseClient
		.from('messages')
		.on('INSERT', (res) => {
			addMessage(res.new)
		})
		.on('DELETE', (res) => {
			removeMessage(res.old)
		})
		.subscribe()
}

const listenRealTimeMessagesAll = (addMessage) => {
	return supabaseClient
		.from('messages')
		.on('DELETE', (res) => {
			addMessage(res.old)
		})
		.subscribe()
}

export default function ChatPage() {
	const router = useRouter()
	const user = router.query.username
	const [message, setMessage] = useState('')
	const [messageList, setMessageList] = useState<messageType[]>()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const allMessages = supabaseClient
			.from('messages')
			.select('*')
			.order('created_at', { ascending: false })
			.then(({ data }) => {
				setMessageList(data)
				setLoading(false)
			})
		listenRealTimeMessages(
			(newMessage) => {
				setMessageList((messageList) => {
					return [newMessage, ...messageList]
				})
			},
			(messageIdToRemove) => {
				setMessageList((messageList) => {
					const newMessageList = messageList.filter(
						(message) => message.id != messageIdToRemove.id
					)
					return newMessageList
				})
			}
		)
	}, [])

	const handleNewMessage = (newMessage: string) => {
		setLoading(true)
		const message = {
			de: user,
			texto: newMessage,
		}

		supabaseClient
			.from('messages')
			.insert([message])
			.then(({ data }) => {
				setLoading(false)
			})
		setMessage('')
	}

	const removeMessage = (id: number) => {
		supabaseClient
			.from('messages')
			.delete()
			.match({ id: id })
			.then(({ status }) => {
				if (status == 200) {
					const newMessageList = messageList.filter(
						(message) => message.id != id
					)
					setMessageList([...newMessageList])
				}
			})
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
				<Header user={user} />
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
					{/* <Popover
						style={{ backgroundColor: popover.color, color: 'white' }}
						isOpen={popover.isOpen && popover.id === 1}
						body={<div>This is tehe vody</div>}
					>
						<button onClick={(e) => togglePopover(e, 1, 'red')}>asd</button>
					</Popover> */}
					<MessageList
						user={user}
						messages={messageList}
						removeMessage={removeMessage}
						loading={loading}
					/>

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
						{/* <Button
							type='submit'
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
						/> */}
						<ButtonSendSticker
							onStickerClick={(sticker) => {
								handleNewMessage(':sticker:' + sticker)
							}}
						/>

						<Button
							type='submit'
							disabled={!message.length}
							styleSheet={
								{
									borderRadius: '50%',
									padding: '0 3px 0 0',
									minWidth: '50px',
									minHeight: '50px',
									fontSize: '20px',
									marginBottom: '8px',
									lineHeight: '0',
									display: 'flex',
									marginLeft: '1rem',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: appConfig.theme.colors.neutrals[300],
									hover: {
										filter: 'grayscale(0)',
									},
								} as any
							}
							label='>'
							// @ts-ignore: Unreachable code error
							onClick={(event) => {
								event.preventDefault()
								handleNewMessage(message)
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

function Header({ user }) {
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
				<Box>
					<Image
						styleSheet={{
							width: '3rem',
							height: '3rem',
							boxShadow: ' 0px 0px 5px black',
							borderRadius: '50%',
						}}
						src={`https://github.com/${user}.png`}
					/>
				</Box>
				<Button
					variant='secondary'
					colorVariant='light'
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
	loading: boolean
	user: string | string[]
}

function MessageList({
	messages,
	removeMessage,
	loading,
	user,
}: MessageListProps) {
	useEffect(() => {}, [loading])

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
			{!messages && (
				<>
					<Skel />
					<Skel />
					<Skel />
					<Skel />
				</>
			)}

			{loading && <Skel />}
			{messages?.map((message) => {
				return (
					<Message
						removeMessage={removeMessage}
						user={user}
						message={message}
					/>
				)
			})}
		</Box>
	)
}
