import { Move } from "./move";
import type { PlayBoard } from "./playBoard";

export class MoveValidator {
    
    board: PlayBoard

    constructor(board: PlayBoard) {
        this.board = board
    }

    validateMove(move: Move) {
        return this.board.doesTileExist(move.to)
        // check if the move is within the board boundaries
        // check if the piece movepattern allows the move
        // check if the move puts the king in check
        // check if the destination tile is free or occupied by a friendly piece
        // if occupied, check if the move is a valid capture
        // später
        // check if the move is a valid promotion
        // check if the move is a valid castling
        // check if the move is a valid en passant
    }
}