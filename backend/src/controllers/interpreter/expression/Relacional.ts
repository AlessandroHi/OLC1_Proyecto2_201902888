import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Environment } from "../abstract/Environment";
import { TipoRelacional } from "../utils/TipoRelacional";

export class Relacional extends Expression {
  public dato1: any;
  public dato2: any;

  constructor(
    private izquierdo: Expression,
    private derecho: Expression,
    private tipoOperacion: TipoRelacional,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Environment): Return {
    // PARA AST
    this.dato1 = this.izquierdo.execute(env);
    this.dato2 = this.derecho.execute(env);

    // obtener los valores de los operandos
    let op1 = this.izquierdo.execute(env);
    let op2 = this.derecho.execute(env);

    switch (this.tipoOperacion) {
      case TipoRelacional.IGUALQ:
        return { value: op1.value == op2.value, type: Type.BOOLEAN };

      case TipoRelacional.DIFERENTEQ:
        return { value: op1.value != op2.value, type: Type.BOOLEAN };

      case TipoRelacional.MAYORQUE:
        return { value: op1.value > op2.value, type: Type.BOOLEAN };

      case TipoRelacional.MENORQUE:
        return { value: op1.value < op2.value, type: Type.BOOLEAN };

      case TipoRelacional.MAYORIGUALQUE:
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };

      case TipoRelacional.MENORIGUALQUE:
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      default:
        return { value: null, type: Type.NULL };
    }
  }

  public drawAst(): { rama: string; nodo: string } {
    // generar un id unico
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    const nodoPrincipal = `nodoRelacional${id.toString()}`;
    let ramaRelacional = "";
    switch (this.tipoOperacion) {
      case TipoRelacional.IGUALQ:
        ramaRelacional = `${nodoPrincipal}[label="Relacional"];\n
        nodoPrimitivo${nodoPrincipal}[label="${this.dato1.value} == ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;
        break
      case TipoRelacional.DIFERENTEQ:
        ramaRelacional = `${nodoPrincipal}[label="Relacional"];\n
        nodoPrimitivo${nodoPrincipal}[label="${this.dato1.value} != ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;
        break
      case TipoRelacional.MAYORQUE:
        ramaRelacional = `${nodoPrincipal}[label="Relacional"];\n
        nodoPrimitivo${nodoPrincipal}[label="${this.dato1.value} > ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;
        break
      case TipoRelacional.MENORQUE:
        ramaRelacional = `${nodoPrincipal}[label="Relacional"];\n
         nodoPrimitivo${nodoPrincipal}[label="${this.dato1.value} < ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;
        break
      case TipoRelacional.MAYORIGUALQUE:
        ramaRelacional = `${nodoPrincipal}[label="Relacional"];\n
         nodoPrimitivo${nodoPrincipal}[label="${this.dato1.value} >= ${this.dato2.value}"];\n
          ${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;
          break
      case TipoRelacional.MENORIGUALQUE:
        ramaRelacional = `${nodoPrincipal}[label="Relacional"];\n
         nodoPrimitivo${nodoPrincipal}[label="${this.dato1.value} <= ${this.dato2.value}"];\n
         ${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;
         break
    }

    return { rama: ramaRelacional, nodo: nodoPrincipal };
  }
}
