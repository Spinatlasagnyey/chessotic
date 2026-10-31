import { Piece } from './piece'
import { Tile } from './tile'
import { BoardConfig } from './boardConfig'
import { GameConfig } from './gameConfig'
import { MoveValidator } from './moveValidator'
import { Move } from './move'

export type Square = { x: number; y: number }

export class PlayBoard {
    pieces: Piece[]
    capturedPieces: Piece[] = []
    tiles: (Tile | undefined)[][]
    boardSize: { width: number, height: number }
    moveValidator: MoveValidator = new MoveValidator(this)

    constructor(boardSize: { width: number, height: number }) {
        this.pieces = []
        this.tiles = []
        this.boardSize = boardSize
    }

    placePiece(piece: Piece, square: Square) {
        const tile = this.tiles[square.x]?.[square.y]
        if (!tile) {
            throw new Error(`Tile at (${square.x}, ${square.y}) does not exist.`)
        }
        if (!this.isTileFree(square)) {
            throw new Error(`Tile at (${square.x}, ${square.y}) is already occupied.`)
        }
        tile.placePiece(piece)
        this.pieces.push(piece)
    }

    movePiece(piece: Piece, toSquare: Square) {
        if (!this.doesTileExist(toSquare)) {
            throw new Error(`Tile at (${toSquare.x}, ${toSquare.y}) does not exist.`)
        }
        const fromSquare = piece.position
        if (!fromSquare) {
            throw new Error(`Piece with id ${piece.id} is not on the board.`)
        }
        if (!this.moveValidator.validateMove(new Move(fromSquare, toSquare))) {
            throw new Error(`Invalid move for piece with id ${piece.id}.`)
        }
        const fromTile = this.tiles[fromSquare.x][fromSquare.y]
        if (!fromTile) {
            throw new Error(`Tile at (${fromSquare.x}, ${fromSquare.y}) does not exist.`)
        }
        fromTile.removePiece()
        const toTile = this.tiles[toSquare.x]?.[toSquare.y]
        if (!toTile) {
            throw new Error(`Tile at (${toSquare.x}, ${toSquare.y}) does not exist.`)
        }
        if (toTile.piece) {
            const capturedPiece = toTile.removePiece()
            this.capturedPieces.push(capturedPiece)
        }
        toTile.placePiece(piece)
    }

    isTileFree(square: Square): boolean {
        return this.tiles[square.x]?.[square.y]?.piece === null
    }

    doesTileExist(square: Square): boolean {
        return this.tiles[square.x] !== undefined && this.tiles[square.x][square.y] !== undefined
    }

    loadFromBoardConfig(boardConfig: BoardConfig) {
        const layout = boardConfig.boardLayout
        const width = Math.max(0, ...layout.map((row) => row.length))
        const height = layout.length
        this.boardSize = { width, height }
        this.tiles = Array.from({ length: width }, (_, x) =>
            Array.from({ length: height }, (_, y) => {
                const marker = layout[y]?.[x]
                if (marker === 'x') {
                    return undefined
                }
                if (marker !== '.') {
                    throw new Error(`Invalid board marker "${marker}" at (${x}, ${y}).`)
                }
                const color = (x + y) % 2 === 0 ? 'white' : 'black'
                return new Tile(x, y, color)
            })
        )
    }

    loadFromGameConfig(gameConfig: GameConfig) {
        this.loadFromBoardConfig(gameConfig.boardConfig)
        for (const piece of gameConfig.pieces) {
            if (piece.position) {
                this.placePiece(piece, piece.position)
            }
        }
    }
}