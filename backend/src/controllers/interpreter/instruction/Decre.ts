import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import {Expression} from '../abstract/Expression';
import { Type } from "../abstract/Return";

export class Decre extends Instruction {

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
          variable.valor-- 
        }
        
        env.modificar(this.id, variable?.valor)

    }

    

}