import { Piece } from './board/piece.svelte'

export class Tile {
    x: number
    y: number
    color: string
    piece: Piece | null
    constructor(x: number, y: number, color: string) {
        this.x = x
        this.y = y
        this.color = color
        this.piece = null
    }

    placePiece(piece: Piece) {
        if (this.piece) {
            if (this.piece.team === piece.team) {
                throw new Error(`Tile at (${this.x}, ${this.y}) is already occupied by a piece of the same team.`)
            }
            this.removePiece()
        }
        this.piece = piece
        piece.placeAt({ x: this.x, y: this.y })
    }

    removePiece() {
        if (!this.piece) {
            throw new Error(`Tile at (${this.x}, ${this.y}) is already empty.`)
        }
        const removedPiece = this.piece
        this.piece.remove()
        this.piece = null
        return removedPiece
    }
}