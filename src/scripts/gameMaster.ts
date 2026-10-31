import type { GameConfig } from "./gameConfig"

export class GameMaster {
    gameConfig: GameConfig

    constructor(gameConfig: GameConfig) {
        this.gameConfig = gameConfig
    }
}