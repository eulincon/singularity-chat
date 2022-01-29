import { Box, Button, Image, Text } from '@skynexui/components'
import React from 'react'
import appConfig from '../../config.json'

type ButtonSendStickerProps = {
	onStickerClick: Function
}

export function ButtonSendSticker({ onStickerClick }: ButtonSendStickerProps) {
	const [isOpen, setOpenState] = React.useState('')

	return (
		<Box
			styleSheet={{
				position: 'relative',
			}}
		>
			<Button
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
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: appConfig.theme.colors.neutrals[300],
						filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
						hover: {
							filter: 'grayscale(0)',
						},
					} as any
				}
				label='😋'
				// @ts-ignore: Unreachable code error
				onClick={() => setOpenState(!isOpen)}
			/>
			{isOpen && (
				<Box
					styleSheet={{
						display: 'flex',
						flexDirection: 'column',
						borderRadius: '5px',
						position: 'absolute',
						backgroundColor: appConfig.theme.colors.neutrals[800],
						width: {
							xs: '200px',
							sm: '290px',
						},
						height: '300px',
						right: '30px',
						bottom: '30px',
						padding: '16px',
						boxShadow:
							'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
					}}
					// @ts-ignore: Unreachable code error
					onClick={() => setOpenState(false)}
				>
					<Text
						styleSheet={
							{
								color: appConfig.theme.colors.neutrals['000'],
								fontWeight: 'bold',
							} as any
						}
					>
						Stickers
					</Text>
					<Box
						tag='ul'
						styleSheet={
							{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								flex: 1,
								paddingTop: '16px',
								overflow: 'scroll',
							} as any
						}
					>
						{appConfig.stickers.map((sticker) => (
							<Text
								// @ts-ignore: Unreachable code error
								onClick={() => {
									// console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
									if (Boolean(onStickerClick)) {
										onStickerClick(sticker)
									}
								}}
								tag='li'
								key={sticker}
								styleSheet={{
									width: '50%',
									borderRadius: '5px',
									padding: '10px',
									focus: {
										backgroundColor: appConfig.theme.colors.neutrals[600],
									},
									hover: {
										backgroundColor: appConfig.theme.colors.neutrals[600],
									},
								}}
							>
								<Image src={sticker} />
							</Text>
						))}
					</Box>
				</Box>
			)}
		</Box>
	)
}
