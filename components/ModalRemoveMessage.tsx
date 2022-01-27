import { Button, Text } from '@skynexui/components'
import React from 'react'
import Modal from 'react-modal'
import appConfig from '../config.json'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: appConfig.theme.colors.neutrals[700],
	},
}

type ModalRemoveMessageProps = {
	messageId: number
	removeMessage: (id: number) => void
}

export default function ModalRemoveMessage({
	messageId,
	removeMessage,
}: ModalRemoveMessageProps) {
	const [modalIsOpen, setIsOpen] = React.useState(false)

	function openModal() {
		setIsOpen(true)
	}
	function closeModal() {
		setIsOpen(false)
	}

	return (
		<div>
			<Button
				// @ts-ignore: Unreachable code error
				onClick={(event) => {
					openModal()
				}}
				label='x'
				fullWidth
				buttonColors={{
					contrastColor: appConfig.theme.colors.neutrals['000'],
					mainColor: appConfig.theme.colors.neutrals[400],
					mainColorLight: appConfig.theme.colors.primary[400],
					mainColorStrong: appConfig.theme.colors.primary[600],
				}}
				styleSheet={{
					width: '30px',
					height: '30px',
					borderRadius: '5px',
					marginLeft: 'auto',
				}}
			/>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<>
					<Text
						variant='body1'
						styleSheet={{
							marginBottom: '32px',
							color: appConfig.theme.colors.neutrals[300],
						}}
					>
						Deseja excluir a mensagem?
					</Text>
					<hr />
					<br />
					<Button
						onClick={(event) => {
							removeMessage(messageId)
						}}
						label='Sim'
						fullWidth
						buttonColors={{
							contrastColor: appConfig.theme.colors.neutrals['000'],
							mainColor: appConfig.theme.colors.neutrals[400],
							mainColorLight: appConfig.theme.colors.primary[400],
							mainColorStrong: appConfig.theme.colors.primary[600],
						}}
						styleSheet={{
							width: '40px',
							height: '30px',
							borderRadius: '5px',
							marginLeft: 'auto',
							marginRight: '1rem',
						}}
					/>
					<Button
						onClick={closeModal}
						label='Não'
						fullWidth
						buttonColors={{
							contrastColor: appConfig.theme.colors.neutrals['000'],
							mainColor: appConfig.theme.colors.neutrals[400],
							mainColorLight: appConfig.theme.colors.primary[400],
							mainColorStrong: appConfig.theme.colors.primary[600],
						}}
						styleSheet={{
							width: '40px',
							height: '30px',
							borderRadius: '5px',
							marginLeft: 'auto',
						}}
					/>
				</>
			</Modal>
		</div>
	)
}
