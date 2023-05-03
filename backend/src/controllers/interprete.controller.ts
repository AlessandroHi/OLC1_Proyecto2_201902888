// importar librerias
import { Request, Response } from "express";
import { printlist } from "./interpreter/Reports/PrintList";
import { ListaErrores, Error } from "./interpreter/Reports/Error";
import { Environment } from "./interpreter/abstract/Environment";
import { Main } from "./interpreter/expression/main/Main";

// creando una clase controlador para manejar informacion y mandarlo al frontend

class InterpreteController {
  // metodo ping
  public pong(req: Request, res: Response) {
    res.send("Pong interpreter controller OLC1");
  }

  // metodo para interpretar el codigo fuente
  public interpretar(req: Request, res: Response) {
    // VACIAR LISTA DE ERRORES PARA NUEVO
    while (ListaErrores.length > 0) {
      ListaErrores.pop();
    }
    // variable parser
    var parser = require("./interpreter/grammar");

    // variable codigo fuente
    const text = req.body.code;
    console.log("Codigo de entrada:  " + text);

    try {
      // parsear el codigo fuente
      const ast = parser.parse(text); //ast es el arbol de sintaxis abstracta

      try {
        printlist.splice(0, printlist.length);

        const globalEnv = new Environment(null);

        for (const inst of ast) {
          inst.execute(globalEnv);
        }


        //PARA AST
        let drawast = `
          digraph G{
              nodoPrincipal[label="AST"];\n
          `;
        for (const inst of ast) {
          const dAst = inst.drawAst();
          drawast += `${dAst.rama}\n`;
          drawast += `nodoPrincipal -> ${dAst.nodo};`;
        }

        drawast += "\n}";
        // ------------------
       
        res.json({ consola: printlist.join("\n"), errores: ListaErrores, AST:drawast });
      } catch (error) {
        res.json({
          consola: "Errors check reports... ",
          errores: ListaErrores,
        });
      }
    } catch (err) {
      res.json({
        consola: "Errors check reports... ",
        errores: ListaErrores,
      });
    }
  }
}

export const interpreteController = new InterpreteController();
