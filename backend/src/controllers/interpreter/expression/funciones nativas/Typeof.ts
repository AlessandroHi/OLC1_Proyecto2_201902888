import { Expression } from "../../abstract/Expression";
import { Return, Type } from "../../abstract/Return";
import { Environment } from "../../abstract/Environment";


export class Typeof extends Expression {
  constructor(private dato: Expression, line: number, column: number) {
    super(line, column);
  }

  public execute(env: Environment): Return {
    const dato = this.dato.execute(env);

    switch (dato.type) {
      case 0:
        return { value: "int", type: Type.STRING };
      case 1:
        return { value: "double", type: Type.STRING };
      case 2:
        return { value: "boolean", type: Type.STRING };
      case 3:
        return { value: "char", type: Type.STRING };
      case 4:
        return { value: "string", type: Type.STRING };
      default:
        return { value: "null", type: Type.STRING };
    }
    return { value: dato.type, type: Type.NULL };
  }
}
