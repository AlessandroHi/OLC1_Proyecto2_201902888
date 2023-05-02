import { Instruction } from "../abstract/Instruction";
import { Expression } from "../abstract/Expression";
import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";

export class DoWhile extends Instruction {

    constructor(
        private condicion: Expression,
        private code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        let condition = this.condicion.execute(env)
       
        do {
            this.code.execute(env);
            condition = this.condicion.execute(env)            
        } while (condition.value);

    }
   
}