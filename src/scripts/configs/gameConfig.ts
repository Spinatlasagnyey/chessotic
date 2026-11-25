import type { BoardConfig } from "./boardConfig"
import type { Piece } from "../board/piece.svelte"


export class GameConfig {
    boardConfig: BoardConfig
    pieces: Piece[]

    constructor(boardConfig: BoardConfig, pieces: Piece[]) {
        this.boardConfig = boardConfig
        this.pieces = pieces
    }
}