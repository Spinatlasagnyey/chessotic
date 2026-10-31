import type { Square } from "./playBoard";

export class Move {
    from: Square
    to: Square

    constructor(from: Square, to: Square) {
        this.from = from
        this.to = to
    }
}