import type { MovePattern } from "./movePattern";

export class PieceType {
    id: string
    name: string
    movePatterns: MovePattern[]
    imageUrl: string

    constructor(opts: { id: string; name: string; movePatterns: MovePattern[]; imageUrl: string }) {
        this.id = opts.id
        this.name = opts.name
        this.movePatterns = opts.movePatterns
        this.imageUrl = opts.imageUrl
    }
}