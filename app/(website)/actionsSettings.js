'use server'

import { prisma } from '@/utils/prisma'
import { redirect } from 'next/navigation'

export async function getNameDB() {
	return await prisma.option.find({
		where: {
			key: 'name',
		},
	})
}

export async function getContactDB() {
	return await prisma.option.findMany({
		where: {
			key: 'name' | 'email',
		},
	})
}

export async function getHidePricesDB() {
	return await prisma.option.find({
		where: {
			key: 'hidePrices',
		},
	})
}
