import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Environment } from "../abstract/Environment";

export class Parametros extends Expression {
  constructor(
    private tipo: Type,
    private id: string,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Environment): Return {
    // verificar el parametro
    return { value: this.id, type: this.tipo };
  }

  public drawAst(): { rama: string; nodo: string } {
    // generar un id unico
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    // generar el nodo
    const nodoPrincipal = `nodoParametro${id.toString()}`;
    const ramaParametro = `${nodoPrincipal}[label="Parametros"];\n
    nodoParametro${nodoPrincipal}[label="${this.id.toString() , this.tipo.toString()}  "];\n
    ${nodoPrincipal} -> nodoParametro${nodoPrincipal};\n`;

    return { rama: ramaParametro, nodo: nodoPrincipal };
  }
}
