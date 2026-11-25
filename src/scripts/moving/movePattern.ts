//import type { Square } from "./square.js";

export class MovePattern {
    pattern: string[]

    // If true, the move direction can be repeated
    IsRepeating: boolean = false;

    // 0 = unlimited repetitions
    // 1 = apply pattern once
    // 2+ = apply pattern up to X times
    RepeatCounter: number = 0;

    isJump: boolean = false;

    constructor(pattern: string[]) {
        this.pattern = pattern
    }  
}
//