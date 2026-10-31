import { BoardConfig } from "./boardConfig";
import { PlayBoard } from "./playBoard";

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
    return playBoard
}