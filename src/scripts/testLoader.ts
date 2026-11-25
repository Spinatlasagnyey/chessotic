import { BoardConfig } from "./configs/boardConfig";
import { PlayBoard } from "./board/playBoard";
import { Piece } from "./board/piece.svelte";

export function TestLoad(): PlayBoard {
    const boardConfig = new BoardConfig([
        "........",
        "...xx...",
        "...xx...",
        "........",
        "........",
        "...xx...",
        "...xx...",
        "........"
    ])
    const playBoard = new PlayBoard({ width: 8, height: 4 })
    playBoard.loadFromBoardConfig(boardConfig)
    const piece = new Piece({ id: "1", type: "Pawn", team: 1, position: { x: 1, y: 1 } })
    playBoard.placePiece(piece, { x: 1, y: 1 })
    return playBoard
}