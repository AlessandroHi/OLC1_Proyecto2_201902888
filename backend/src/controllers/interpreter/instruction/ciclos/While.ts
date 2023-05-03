import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";


export class While extends Instruction {

    constructor(
        private condicion: Expression,
        public code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {
        
        let condition = this.condicion.execute(env)
        
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
      return {rama:"", nodo: ""};
  }
    
}