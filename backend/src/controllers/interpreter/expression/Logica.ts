import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Environment } from "../abstract/Environment";
import { TipoLogica } from "../utils/TipoLogica";

export class Logica extends Expression {
    public dato1: any;
    public dato2: any;
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
        //PARA AST
        this.dato1 = this.izquierdo.execute(env);
        this.dato2 = this.derecho.execute(env)

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

    public drawAst(): { rama: string; nodo: string } {
        // generar un id unico
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        const nodoPrincipal = `nodoLogica${id.toString()}`;
        let ramaLogica = "";
        switch (this.tipoOperacion) {
          case TipoLogica.AND:
            ramaLogica = `${nodoPrincipal}[label="Logico"];\n
            nodoLogica${nodoPrincipal}[label="${this.dato1.value} && ${this.dato2.value}"];\n
            ${nodoPrincipal} -> nodoLogica${nodoPrincipal};\n`;
            break
          case TipoLogica.NOT:
            ramaLogica = `${nodoPrincipal}[label="Logico"];\n
            nodoLogica${nodoPrincipal}[label="!${this.dato1.value} "];\n
            ${nodoPrincipal} -> nodoLogica${nodoPrincipal};\n`;
            break
          case TipoLogica.OR:
            ramaLogica = `${nodoPrincipal}[label="Logico"];\n
            nodoLogica${nodoPrincipal}[label="${this.dato1.value} || ${this.dato2.value}"];\n
            ${nodoPrincipal} -> nodoLogica${nodoPrincipal};\n`;
            break
        }
    
        return { rama: ramaLogica, nodo: nodoPrincipal };
      }

}