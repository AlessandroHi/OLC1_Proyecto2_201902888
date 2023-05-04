import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";

export class Arreglo extends Instruction {

    public tam: number;
    public valores: string;

    constructor(
        public id: string,
        public arrayExpresiones: Array<Expression>,
        public tipo: string,
        public contenido: Array<any>,   //EL OBJETO que guarda los elementos del array
        line: number,
        column: number
    ) {
        super(line, column)
        this.tam = -1
        this.valores =''

    }
    public execute(env: Environment) {
        this.arrayExpresiones.forEach(element => {
            const elemento = element.execute(env)
            this.valores += elemento.value +' , '
        })
       
        if(this.tipo == "0"){
            env.guardar_arreglo(this.id,this,"INT",this.line,this.column);
        }
        if(this.tipo == "1"){
            env.guardar_arreglo(this.id,this,"DOUBLE",this.line,this.column);
        }
        if(this.tipo == "2"){
            env.guardar_arreglo(this.id,this,"BOOLEAN",this.line,this.column);
        }
        if(this.tipo == "3"){
            env.guardar_arreglo(this.id,this,"CHAR",this.line,this.column);
        }
        if(this.tipo == "4"){
            env.guardar_arreglo(this.id,this,"STRING",this.line,this.column);
        }
         
        
    }

    public drawAst(): { rama: string; nodo: string; } {
         
       
        console.log(this.valores)
      // generar un id unico
      const id = Math.floor(Math.random() * (100-0)+0);
      // generar el nodo
      const nodoPrincipal  = `nodoArray${id.toString()}`;
      const ramaArray = `${nodoPrincipal}[label="Arreglo"];\n
      nodoArray${nodoPrincipal}[label="ID: ${this.id} \n datos: ${this.valores} "];\n
      ${nodoPrincipal} -> nodoArray${nodoPrincipal};\n`;

           
      return { rama:ramaArray, nodo:nodoPrincipal };
      }

}

/**
 * Retorna un numero segun el tipo
 * @param id 
 * @returns 
 */
export function get_num(id: string): number {
    switch (id) {
        case "number":
            return 0
        case "string":
            return 1
        case "boolean":
            return 2
        default:
            return 0
    }
}