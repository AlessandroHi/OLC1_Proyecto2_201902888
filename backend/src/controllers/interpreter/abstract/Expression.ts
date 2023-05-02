
import { Return } from "./Return"
import { Environment } from "./Environment"

export abstract class Expression {

    constructor(public line: number, public column: number) {
        this.line = line
        this.column = column + 1
    }

    public abstract execute(environment: Environment): Return
   
}