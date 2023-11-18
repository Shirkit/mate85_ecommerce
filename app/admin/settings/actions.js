'use server'

import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'

export async function updateSettings(data) {
	const session = await getServerSession()
    if (!session || !session.user.role || session.user.role != "admin") {
        return false
    }
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
