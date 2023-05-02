import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Environment } from "../abstract/Environment";
import { TipoLogica } from "../utils/TipoLogica";

export class Logica extends Expression {
    constructor(
      private izquierdo: Expression,
      private derecho: Expression,
      private tipoOperacion: TipoLogica,
      line: number,
      column: number
    ) {
      super(line, column);
    }


    public execute(env: Environment): Return {
        const op1 = this.izquierdo.execute(env);
        const op2 = this.derecho.execute(env);
        
        switch (this.tipoOperacion) {
            case TipoLogica.AND:
                return { value: op1.value && op2.value, type: Type.BOOLEAN }
            case TipoLogica.OR:
                return { value: op1.value || op2.value, type: Type.BOOLEAN }
            case TipoLogica.NOT:
                return { value: !op1.value, type: Type.BOOLEAN }
            default:
                return { value: null, type: Type.NULL }
        }


    }

}