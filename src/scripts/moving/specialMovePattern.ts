import { MovePattern } from "./movePattern.js";

export class SpecialMovePattern extends MovePattern {
    specialMoveType: string
    constructor(pattern: string[], specialMoveType: string) {
        super(pattern)
        this.specialMoveType = specialMoveType
    }
}