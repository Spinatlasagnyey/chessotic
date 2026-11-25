import type { MovePattern } from "../moving/movePattern";
import type { Square } from "../square";

export type PieceStatus = {
	[key: string]: boolean
}

export class Piece {
	id: string
	type: string
	position = $state<Square | null>(null)
	team: number
    patterns: MovePattern[] //This is a copy of the move patterns from the piece type, but can be modified for this specific piece instance
	status: PieceStatus

	constructor(opts: {
		id?: string
		type: string
		position?: Square | null
		team: number
		status?: PieceStatus
		patterns?: MovePattern[]
	}) {
		this.id = opts.id ?? cryptoRandomId()
		this.type = opts.type
		this.team = opts.team
		this.position = opts.position ?? null
		this.status = opts.status ?? {}
		this.patterns = opts.patterns ?? []
	}

	placeAt(square: Square) {
		this.position = { x: square.x, y: square.y }
	}

	remove() {
		this.position = null
	}

	setStatus(key: string, value: boolean) {
		this.status[key] = value
	}

	clearStatus(key: string) {
		delete this.status[key]
	}
}

function cryptoRandomId() {
	try {
		const arr = new Uint32Array(4)
		if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
			crypto.getRandomValues(arr)
			return Array.from(arr).map(n => n.toString(36)).join('-')
		}
	} catch (error: Error | unknown) {
		console.error('Error generating random ID:', error)
		// Fallback to Math.random if crypto is not available
	}
	return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default Piece