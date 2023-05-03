import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Environment } from "../abstract/Environment";
import {
  TablaSuma,
  TablaResta,
  TablaMulti,
  TablaDivision,
  TablaPotencia,
  TablaModulo,
} from "../utils/TablaDominante";
import { TipoAritmetica } from "../utils/TipoAritmetica";

export class Aritmetica extends Expression {
  public dato1: any;
  public dato2: any;

  constructor(
    private izquierdo: Expression,
    private derecho: Expression,
    private tipoOperacion: TipoAritmetica,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Environment): Return {
    // PARA AST
    this.dato1 = this.izquierdo.execute(env);
    this.dato2 = this.derecho.execute(env);
    // verificar el tipo de operacion
    if (this.tipoOperacion == TipoAritmetica.SUMA) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecho.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaSuma[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }

          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value + op2.value, type: Type.INT };
        // verifcar demas tipos de datos
        case Type.DOUBLE:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a decimal
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a decimal
            op2.value = op2.value ? 1 : 0;
          }
          return { value: op1.value + op2.value, type: Type.DOUBLE };
        case Type.STRING:
          // verificar si algun operando es de tipo entero
          if (op1.type == Type.INT) {
            // convertir el valor a decimal
            op1.value = op1.value.toString();
          }
          if (op2.type == Type.INT) {
            // convertir el valor a decimal
            op2.value = op2.value.toString();
          }
          return { value: op1.value + op2.value, type: Type.STRING };
      }
    } //  RESTA
    else if (this.tipoOperacion == TipoAritmetica.RESTA) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecho.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaResta[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value - op2.value, type: Type.INT };
        case Type.DOUBLE:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value - op2.value, type: Type.DOUBLE };
      } //MULTIPLICACION
    } else if (this.tipoOperacion == TipoAritmetica.MULTIPLICACION) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecho.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaMulti[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          // verificar si algun operando es de tipo double
          if (op1.type == Type.DOUBLE) {
            // convertir el valor a entero
            op1.value = Number.parseInt(op1.value);
          }
          if (op2.type == Type.DOUBLE) {
            // convertir el valor a entero
            op2.value = Number.parseInt(op2.value);
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value * op2.value, type: Type.INT };
        case Type.DOUBLE:
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value * op2.value, type: Type.DOUBLE };
      }
    } //DIVISION
    else if (this.tipoOperacion == TipoAritmetica.DIVISION) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecho.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaDivision[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.DOUBLE:
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value / op2.value, type: Type.DOUBLE };
      }
    } //POTENCIA
    else if (this.tipoOperacion == TipoAritmetica.POTENCIA) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecho.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaPotencia[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          return { value: Math.pow(op1.value, op2.value), type: Type.INT };
        case Type.DOUBLE:
          return { value: Math.pow(op1.value, op2.value), type: Type.DOUBLE };
      }
    } //MODULO
    else if (this.tipoOperacion == TipoAritmetica.MODULO) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecho.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaModulo[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          return { value: op1.value % op2.value, type: Type.INT };
        case Type.DOUBLE:
          return { value: op1.value % op2.value, type: Type.DOUBLE };
      }
    }
    //  UNARIO
    else if (this.tipoOperacion == TipoAritmetica.MENOSUNARIO) {
      // obtener los valores de  los operandos
      const op2 = this.izquierdo.execute(env);
      // entero
      if (op2.type == Type.INT) {
        return { value: -op2.value, type: Type.INT };
      }
      // doble
      else if (op2.type == Type.DOUBLE) {
        return { value: -op2.value, type: Type.DOUBLE };
      }
    }
    return { value: null, type: Type.NULL };
  }

  public drawAst(): { rama: string; nodo: string } {
    // generar un id unico
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    const nodoPrincipal = `nodoArit${id.toString()}`;
    let ramaRelacional = "";
    switch (this.tipoOperacion) {
      case TipoAritmetica.SUMA:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
        nodoArit${nodoPrincipal}[label="${this.dato1.value} + ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
      case TipoAritmetica.RESTA:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
        nodoArit${nodoPrincipal}[label="${this.dato1.value} - ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
      case TipoAritmetica.MULTIPLICACION:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
        nodoArit${nodoPrincipal}[label="${this.dato1.value} * ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
      case TipoAritmetica.DIVISION:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
        nodoArit${nodoPrincipal}[label="${this.dato1.value} / ${this.dato2.value}"];\n
        ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
      case TipoAritmetica.POTENCIA:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
        nodoArit${nodoPrincipal}[label="${this.dato1.value} ^ ${this.dato2.value}"];\n
          ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
      case TipoAritmetica.MODULO:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
        nodoArit${nodoPrincipal}[label="${this.dato1.value} % ${this.dato2.value}"];\n
         ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
      case TipoAritmetica.MODULO:
        ramaRelacional = `${nodoPrincipal}[label="Aritmetica"];\n
          nodoArit${nodoPrincipal}[label="${this.dato1.value} % ${this.dato2.value}"];\n
           ${nodoPrincipal} -> nodoArit${nodoPrincipal};\n`;
        break;
    }

    return { rama: ramaRelacional, nodo: nodoPrincipal };
  }
}
