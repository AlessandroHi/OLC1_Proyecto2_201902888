import { Expression } from "../../abstract/Expression";
import { Return, Type } from "../../abstract/Return";
import { Environment } from "../../abstract/Environment";

export class Length extends Expression {
    constructor(
      private dato: Expression,
      line: number,
      column: number
    ) {
      super(line, column);
    }

    public execute(env: Environment): Return {
        const dato = this.dato.execute(env);
        
        return { value: dato.value.length, type: Type.INT }      
    }

    public drawAst(): { rama: string; nodo: string } {
      // generar un id
    const id = Math.floor(Math.random() * (100-0)+0);
    // generar el nombre del nodo
    const nodoPrincipal = `nodoPrint${id.toString()}`;
    let ramaPrint = `${nodoPrincipal}[label="Lenght"];\n`
    const codigoRama:{rama:string, nodo:string} = this.dato.drawAst();
    ramaPrint += codigoRama.rama;
    ramaPrint += `${nodoPrincipal} -> ${codigoRama.nodo};\n`
    return {rama:ramaPrint, nodo:nodoPrincipal};
  }

}