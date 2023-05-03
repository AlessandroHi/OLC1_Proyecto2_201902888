import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import {Expression} from '../abstract/Expression';
import { Type } from "../abstract/Return";

export class Incre extends Instruction {

    constructor(
        private id: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        //primero traer la va variable de la tabla de simbolos
        const variable = env.getVar(this.id)

        
        if(variable){
          variable.valor++ 
        }
        
        env.modificar(this.id, variable?.valor)

    }
    public drawAst(): { rama: string; nodo: string } {
        // generar un id unico
      const id = Math.floor(Math.random() * (100-0)+0);
      // generar el nodo
      const nodoPrincipal  = `nodoDecre${id.toString()}`;
      const ramadrecre = `${nodoPrincipal}[label="Incre"];\n
      nodoDecre${nodoPrincipal}[label="${this.id} ++"];\n
      ${nodoPrincipal} -> nodoDecre${nodoPrincipal};\n`;
      
      return { rama:ramadrecre, nodo:nodoPrincipal };
      }

    

}