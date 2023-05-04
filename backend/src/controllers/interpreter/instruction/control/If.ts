import { Instruction } from "../../abstract/Instruction";
import { Expression } from "../../abstract/Expression";
import { Environment } from "../../abstract/Environment";
import { Type } from "../../abstract/Return";

export class If extends Instruction {
  public condi: any;
  constructor(
    private condicion: Expression,
    private statementIf: Instruction,
    private stamentElse: Instruction | null,
    linea: number,
    columna: number
  ) {
    super(linea, columna);
  }

  public execute(env: Environment) {
    // obtener el  valor  de la condicion
    this.condi = this.condicion.execute(env);

    const condicion = this.condicion.execute(env);
    if (condicion.type == Type.BOOLEAN) {
      // si verdadero
      if (condicion.value) {
        this.statementIf.execute(env);
      } else {
        if (this.stamentElse != null) {
          this.stamentElse.execute(env);
        }
      }
    }
  }

  public drawAst(): { rama: string; nodo: string } {
    // generar un id
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    // generar el nombre del nodo
    const nodoPrincipal = `nodoIF${id.toString()}`;
    let ramaCom = `${nodoPrincipal}[label="control if"];\n`;

    let ramaIF = `${nodoPrincipal}[label="IF"];\n
      nodoIF${nodoPrincipal}[label=" IF"];\n
      ${nodoPrincipal} -> nodoIF${nodoPrincipal};\n`;
    
    let ramaElse = `${nodoPrincipal}[label="IF"];\n
    nodoIF${nodoPrincipal}[label=" IF"];\n
    ${nodoPrincipal} -> nodoIF${nodoPrincipal};\n`;

  
    const codigoIF: { rama: string; nodo: string } =
      this.statementIf.drawAst();
      ramaIF += codigoIF.rama;
      ramaIF += `${ramaIF} -> ${codigoIF.nodo};\n`;

      
      if(this.stamentElse){
        const codigoElse: { rama: string; nodo: string } = this.stamentElse.drawAst();
        ramaElse += codigoElse.rama;
        ramaElse += `${ramaElse} -> ${codigoElse.nodo};\n`;
        }
     
      return { rama: ramaCom, nodo: nodoPrincipal };
  }
}
