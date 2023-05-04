import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";
import { get_num } from "./Arreglo"
import {Error} from '../../Reports/Error'

export class ArregloAcciones extends Instruction {

    constructor(
        public nombre: string,
        public expre: Expression,
        public push: boolean,      //push
        public pop: boolean,       //pop
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        //revisar que existe este array
        let objeto = env.get_array(this.nombre)
        if (objeto == undefined) throw new Error("Semantico", `Este array '${this.nombre}' no se pudo encontrar`, this.line, this.column)

        let array = objeto.contenido as Array<any>

        if (this.pop) {
            array.pop()
        } else {
            const tmp = this.expre.execute(env)
            if (tmp.type != get_num(objeto.tipo)) throw new Error("Semantico", `La expresion tiene que ser del mismo tipo que el array, el array '${this.nombre}' es tipo [${objeto.tipo}] y se detecto el tipo`, this.line, this.column)
            array.push(tmp.value)
        }
        env.update_array(this.nombre, array)
    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama:"", nodo:""};
      }
}