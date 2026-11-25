import type { GameConfig } from "../configs/gameConfig"

export class GameMaster {
    gameConfig: GameConfig

    constructor(gameConfig: GameConfig) {
        this.gameConfig = gameConfig
    }
}