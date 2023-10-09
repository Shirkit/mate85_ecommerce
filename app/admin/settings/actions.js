'use server'

import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'

export async function updateSettings(data) {
	await prisma.option.updateMany({
		where: {
			OR: data.map((item) => ({
				key: item.key,
				value: {
					NOT: {
						equals: item.value,
					},
				},
			})),
		},
		data: {
			value: {
				set: data.map((item) => item.value),
			},
		},
	})

	redirect('/admin/settings')
}
