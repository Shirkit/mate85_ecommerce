'use server'

import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/app/api/auth/[...nextauth]/route'

export async function updateSettings(data) {
	const session = await getServerSession()
    if (!session || !session.user.role || session.user.role != "admin") {
        return false
    }

	await Promise.all(data.map(async (item) => {

		const updateData = {}
		updateData[item.key] = item.value;

		await prisma.option.updateMany({
			where: {

				key: item.key,
				value: {
					not: item.value,
				},
			},
			data: {
				value: item.value,
			}
			})
	}));

	redirect('/admin/settings')
}
