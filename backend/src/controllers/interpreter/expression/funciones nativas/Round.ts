import { Expression } from "../../abstract/Expression";
import { Return, Type } from "../../abstract/Return";
import { Environment } from "../../abstract/Environment";


export class Round extends Expression {
    constructor(
      private dato: Expression,
      line: number,
      column: number
    ) {
      super(line, column);
    }

    public execute(env: Environment): Return {
        const dato = this.dato.execute(env);
        return { value: Math.round(dato.value), type: Type.INT }      
    }

}

