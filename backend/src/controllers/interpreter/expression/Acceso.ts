import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Environment } from "../abstract/Environment";

export class Acceso extends Expression {
    // int a = 5;

    constructor (private id:string, line: number, column: number) {
        super(line, column);
    }
    
    public execute(env: Environment): Return {
        
        const value = env.getVar(this.id);
        if (value) {
            return {value: value.valor, type: value.type};
        }else {
            return {value: null, type: Type.NULL}
        }
    }
   
    
    public drawAst(): { rama: string; nodo: string } {
        // generar un id unico
      const id = Math.floor(Math.random() * (100-0)+0);
      // generar el nodo
      const nodoPrincipal  = `nodoAcceso${id.toString()}`;
      const ramaacceso = `${nodoPrincipal}[label="Acceso"];\n
      nodoAcceso${nodoPrincipal}[label="${this.id}"];\n
      ${nodoPrincipal} -> nodoAcceso${nodoPrincipal};\n`;
      
      return { rama:ramaacceso, nodo:nodoPrincipal };
      }
}




