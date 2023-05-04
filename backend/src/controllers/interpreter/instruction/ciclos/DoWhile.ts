import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";
import { Type } from "../../abstract/Return";

export class DoWhile extends Instruction {
    public condi: any
    constructor(
        private condicion: Expression,
        private code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {
        this.condi = this.condicion.execute(env)

        let condition = this.condicion.execute(env)
       
        do {
            this.code.execute(env);
            condition = this.condicion.execute(env)            
        } while (condition.value);

    }

    public drawAst(): { rama: string; nodo: string; } {
         // generar un id
         const id = Math.floor(Math.random() * (100-0)+0);
         // generar el nombre del nodo
         const nodoPrincipal = `nodoDO${id.toString()}`;
         let ramaDo = `${nodoPrincipal}[label="Do while ${this.condi.value}"];\n`
         const codigoRama:{rama:string, nodo:string} = this.code.drawAst();
         ramaDo += codigoRama.rama;
         ramaDo += `${nodoPrincipal} -> ${codigoRama.nodo};\n`
         return {rama:ramaDo, nodo:nodoPrincipal};
    }
   
}