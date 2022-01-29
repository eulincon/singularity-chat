import { Box, Text } from '@skynexui/components'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import appConfig from '../../config.json'

export default function Skel() {
	return (
		<SkeletonTheme baseColor='#202020' highlightColor='#444'>
			<Text
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
						marginBottom: '16px',
					}}
				>
					<Skeleton inline width={'2%'} circle style={{ marginRight: '8px' }} />
					<Skeleton inline width={'5%'} />
					<Text
						styleSheet={{
							fontSize: '10px',
							marginLeft: '8px',
							color: appConfig.theme.colors.neutrals[300],
						}}
						tag='span'
					>
						<Skeleton inline width={'5%'} />
					</Text>
				</Box>
				<Skeleton />
			</Text>
		</SkeletonTheme>
	)
}
