'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export default function Settings() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [hidePrices, setHidePrices] = useState(false)

	return (
		<form className="flex flex-col gap-8 m-2 bg-zinc-700 p-8 text-white border-solid rounded-lg h-fit">
			<h1 className="text-2xl font-bold border-b-zinc-600 border-b">
				Configurações gerais do site
			</h1>
			<div className="grid grid-cols-2 gap-8">
				<div className="w-80">
					<label htmlFor="name">Nome do site</label>
					<Input
						placeholder="Digite o nome do site"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="w-80">
					<label htmlFor="email">E-mail para contato</label>
					<Input
						placeholder="Digite o e-mail para contato"
						id="email"
						value={email}
						type="email"
						pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="w-80">
					<label htmlFor="phone">Telefone para contato</label>
					<Input
						placeholder="Digite o telefone para contato"
						id="phone"
						value={phone}
						type="tel"
						pattern="[0-9]{11}"
						onChange={(e) => setPhone(e.target.value)}
						title="Informe um número de telefone com 11 dígitos numéricos."
						required
					/>
				</div>
				<div className="flex flex-col gap-4 items-start justify-end">
					<label htmlFor="airplane-mode">
						Esconder os preços dos produtos
					</label>
					<Switch
						id="airplane-mode"
						value={hidePrices}
						onChange={(e) => setHidePrices(e.target.value)}
					/>
				</div>
			</div>
			<Button type="submit">Salvar</Button>
		</form>
	)
}
