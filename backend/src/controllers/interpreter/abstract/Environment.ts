import { Simbolo } from "./Symbol";
import { Type } from "./Return";
import { printlist } from "../Reports/PrintList";
import { Funcion } from "../instruction/Funcion";
import { Arreglo } from "../instruction/Array/Arreglo";
import { ListaTabla, TablaSimbolos } from "../Reports/TablaSimbolos";

export class Environment {
  private variables = new Map<string, Simbolo>(); //  mapa de variables
  private funciones = new Map<string, Funcion>(); //  mapa de Funciones metodos
  private arreglos = new Map<string, Arreglo>(); //  mapa de variables

  // constructor
  constructor(private anterior: Environment | null) {
    this.variables = new Map<string, Simbolo>();
  }

  // guardar una nueva variable
  public guardar(
    id: string,
    valor: any,
    tipo: Type,
    linea: number,
    columna: number
  ) {
    // verificar el ambito
    let env: Environment | null = this;
  
    // verificar si la variable ya existe
    if (!env.variables.has(id.toLowerCase())) {
      // guardar la variable
      // guardar la variable en una tabla de simbolos para el reporte
      const variable = new TablaSimbolos(id,tipo.toString(),"Variable","Funcion", linea,columna)

      ListaTabla.push(variable);


      env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo));
    } else {
      printlist.push(
        "Error, La variable " +
          id +
          " ya existe en el entorno, linea " +
          linea +
          " y columna " +
          columna
      );
    }
  }

  // obtener una variable
  public getVar(id: string): Simbolo | null {
    // verificar el ambito
    let env: Environment | null = this;

    // buscar la variable en el entorno actual
    while (env != null) {
      // verificar si la variable existe
      if (env.variables.has(id.toLowerCase())) {
        return env.variables.get(id.toLowerCase())!;
      }
      // buscar en el entorno anterior
      env = env.anterior;
    }
    return null;
  }

  // guardar una nueva funcion
  public guardarFuncion(id: string, funcion: Funcion,  tipo: Type, linea: number,columna:number) {
    // verificar el ambito
    let env: Environment | null = this;
    
    if(tipo == null){
      const funcion1 = new TablaSimbolos(id,"Void","Metodo","---", linea,columna)
      ListaTabla.push(funcion1);
    }else{
      const funcion1 = new TablaSimbolos(id,tipo.toString(),"Funcion","---", linea,columna)
      ListaTabla.push(funcion1);
    }

    
    // verificar si la funcion ya existe
    if (!env.funciones.has(id.toLowerCase())) {
      // guardar la variable
      // guardar la variable en una tabla de simbolos para el reporte
      env.funciones.set(id.toLowerCase(), funcion);
    } else {
      printlist.push("Error, La funcion " + id + " ya existe en el entorno");
    }
  }

  // acceder a una funcion
  public getFuncion(id: string): Funcion | null {
    // verificar el ambito
    let env: Environment | null = this;

    // buscar la variable
    while (env != null) {
      // verificar si la variable existe
      if (env.funciones.has(id.toLowerCase())) {
        // retornar la variable
        return env.funciones.get(id.toLowerCase())!;
      }
      // cambiar de ambito
      env = env.anterior;
    }

    // retornar null si no se encontro la variable
    return null;
  }

  // obtener el entorno global
  public getGlobal(): Environment {
    // verificar el ambito
    let env: Environment | null = this;

    // buscar la variable
    while (env.anterior != null) {
      // cambiar de ambito
      env = env.anterior;
    }
    // retornar el entorno global
    return env;
  }

  // modificar una variable
  public modificar(id: string, valor: any) {
    // verificar el ambito
    let env: Environment | null = this;
    while (env != null) {
      // verificar si la variable existe
      if (env.variables.has(id.toLowerCase())) {
        // modificar la variable
        env.variables.get(id.toLowerCase())!.valor = valor;
        return;
      }
      // cambiar de ambito
      env = env.anterior;
    }
  }

  public guardar_arreglo(id: string, Arreglo: Arreglo, tipo:string, linea: number, columna:number) {
    // verificar el ambito
    let env: Environment | null = this;
    const array = new TablaSimbolos(id,tipo,"Arreglo","main", linea,columna)
    ListaTabla.push(array);
    // verificar si la funcion ya existe
    if (!env.arreglos.has(id.toLowerCase())) {
      // guardar la variable
      // guardar la variable en una tabla de simbolos para el reporte
      env.arreglos.set(id.toLowerCase(), Arreglo);
    } else {
      printlist.push("Error, La funcion " + id + " ya existe en el entorno");
    }
  }

  public get_array(nombre: string): Arreglo | undefined {
    let env: Environment | null = this;
    while (env != null) {
      if (env.arreglos.has(nombre)) return env.arreglos.get(nombre);
      env = env.anterior;
    }
    return undefined;
  }

  public update_array(id: string, arreglo: Array<any>) {
    let env: Environment | null = this;
    while (env != null) {
      if (env.arreglos.has(id)) {
        for (let entry of Array.from(env.arreglos.entries())) {
          if (entry[0] == id) {
            entry[1].contenido = arreglo;
            return;
          }
        }
      }
      env = env.anterior;
    }
  }
}
