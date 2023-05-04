import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";

export class Statement extends Instruction {
  constructor(private body: Array<Instruction>, line: number, column: number) {
    super(line, column);
  }

  public execute(env: Environment) {
    const newEnv = new Environment(env);

    for (const instrucciones of this.body) {
      try {
        const ret = instrucciones.execute(newEnv);
        // si la instruccion es un return, retornar el valor
        if (ret != null && ret != undefined) {
          return ret;
        }
      } catch (e) {
        console.log("Errro al ejecutar instrucciones");
      }
    }
  }
  public drawAst(): { rama: string; nodo: string } {
    // generar un id unico
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    // generar el nodo
    const nodoPrincipal = `nodoSta${id.toString()}`;
    let ramasta = `${nodoPrincipal}[label="Statment"];\n`
    this.body.forEach(element => {
        const bodyrama:{rama:string, nodo:string} = element.drawAst(); 
        ramasta += bodyrama.rama;
        ramasta += `${nodoPrincipal} -> ${bodyrama.nodo};\n`
    });

    return { rama: ramasta, nodo: nodoPrincipal };
  }
}
