import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";

export class For extends Instruction {
  constructor(
    private variable: Instruction,
    private condicion: Expression,
    private incremento: Instruction,
    private code: Instruction,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Environment) {
    // declarar la variable
    this.variable.execute(env);
    // contador para evitar ciclos infinitos
    let contador = 0;
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
      if (contador > 1000) {
        console.log("Error: Ciclo infinito");
        break;
      }
      /*if(element.type == Type.RETURN){
                return element;
            }else if(element.type == Type.BREAK){
                break;
            }else if(element.type == Type.CONTINUE){
                this.incremento.execute(env);
                continue;
            }*/
      this.incremento.execute(env);
      // incrementar el contador
      contador++;
    }
  }

  public drawAst(): { rama: string; nodo: string; } {
          // generar un id
          const id = Math.floor(Math.random() * (100-0)+0);
          // generar el nombre del nodo
          const nodoPrincipal = `nodoFor${id.toString()}`;
          let ramaFor = `${nodoPrincipal}[label="For"];\n`
          const codigoRama:{rama:string, nodo:string} = this.code.drawAst();
          ramaFor += codigoRama.rama;
          ramaFor += `${nodoPrincipal} -> ${codigoRama.nodo};\n`
          return {rama:ramaFor, nodo:nodoPrincipal};
}
}
