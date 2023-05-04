import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import {Expression} from '../abstract/Expression';
import { Type } from "../abstract/Return";

export class Funcion extends Instruction{
    constructor(private tipo:Type,private id:string, public parametros:Array<Expression>, public statement:Instruction, line:number, column:number)
    {
        super(line, column);
    }

    public execute(env: Environment) {
        // guardar la funcion en entorno
        env.guardarFuncion(this.id,this,this.tipo,this.line,this.column);
    } 

    public drawAst(): { rama: string; nodo: string; } {
    // generar un id
    const id = Math.floor(Math.random() * (100-0)+0);
    // generar el nombre del nodo
    const nodoPrincipal = `nodofuncion${id.toString()}`;
    let ramaFUN;
    if(this.tipo == null){
        ramaFUN = `${nodoPrincipal}[label="Metodo  ${this.id}"];\n`
    }else{
        ramaFUN = `${nodoPrincipal}[label="Funcion  ${this.id}"];\n`
    }
    const codigoRama:{rama:string, nodo:string} = this.statement.drawAst();
    ramaFUN += codigoRama.rama;
    ramaFUN += `${nodoPrincipal} -> ${codigoRama.nodo};\n`
    return {rama:ramaFUN, nodo:nodoPrincipal};
      }
    
}