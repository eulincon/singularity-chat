import { Box, Icon, Image, Text } from '@skynexui/components'
import React, { useState } from 'react'
import Popover from 'react-popover'
import appConfig from '../../config.json'
import ModalRemoveMessage from './ModalRemoveMessage'
type MessageType = {
	message: any
	user: string | string[]
	removeMessage: (id: number) => void
}
export default function Message({ message, user, removeMessage }: MessageType) {
	const [popover, setPopover] = useState({
		id: -1,
		isOpen: false,
	})
	const togglePopover = (e, _id) => {
		if (_id !== popover.id && popover.isOpen) {
			setPopover({ id: _id, isOpen: !popover.isOpen })
		} else {
			setPopover({ id: _id, isOpen: !popover.isOpen })
		}
	}
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
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Popover
					style={{
						backgroundColor: appConfig.theme.colors.neutrals[900],
						minHeight: '6rem',
						borderRadius: '5px',
						color: 'white',
						// cursor: 'pointer',
					}}
					isOpen={popover.isOpen && popover.id === 1}
					body={
						<div
							style={{
								padding: '1rem',
								cursor: 'pointer',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							onClick={(e) => togglePopover(e, -1)}
						>
							<Image
								styleSheet={{
									width: '4rem',
									height: '4rem',
									borderRadius: '50%',
									display: 'inline-block',
								}}
								src={`https://github.com/${message.de}.png`}
							/>
							<Text>{message.de}</Text>
							<a
								rel='stylesheet'
								href={`https://www.github.com/${message.de}`}
								target='_blank'
							>
								<Icon name='FaGithub' styleSheet={{ color: 'white' }} />
							</a>
						</div>
					}
				>
					<Image
						// @ts-ignore: Unreachable code error
						onClick={(e) => togglePopover(e, 1)}
						styleSheet={{
							width: '20px',
							height: '20px',
							borderRadius: '50%',
							display: 'inline-block',
							marginRight: '8px',
							cursor: 'pointer',
						}}
						src={`https://github.com/${message.de}.png`}
					/>
				</Popover>

				<Text tag='strong'>{message.de}</Text>
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
					{message.de == user && (
						<ModalRemoveMessage
							messageId={message.id}
							removeMessage={removeMessage}
						/>
					)}
				</Box>
			</Box>
			{message?.texto.startsWith(':sticker:') ? (
				<Image
					styleSheet={{
						maxWidth: '10rem',
					}}
					src={message.texto.replace(':sticker:', '')}
				/>
			) : (
				message.texto
			)}
			{/* {message?.texto} */}
		</Text>
	)
}
