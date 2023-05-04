import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";


export class While extends Instruction {
    public condi: any
    
    constructor(
        private condicion: Expression,
        public code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {
        
       this.condi = this.condicion.execute(env)
        
        while (true) {
            // obtener el  valor  de la condicion
            const condicion = this.condicion.execute(env);
            if (condicion != null && condicion != undefined) {
              if (!condicion.value) {
                break;
              }
            }
            // ejecutar el codigo
            const element = this.code.execute(env);
            
           
          }
    }

    public drawAst(): { rama: string; nodo: string; } {
          // generar un id
    const id = Math.floor(Math.random() * (100-0)+0);
    // generar el nombre del nodo
    const nodoPrincipal = `nodoWhile${id.toString()}`;
    let ramaWhile = `${nodoPrincipal}[label="While ${this.condi.value}"];\n`
    const codigoRama:{rama:string, nodo:string} = this.code.drawAst();
    ramaWhile += codigoRama.rama;
    ramaWhile += `${nodoPrincipal} -> ${codigoRama.nodo};\n`
    return {rama:ramaWhile, nodo:nodoPrincipal};
                
  }
    
}