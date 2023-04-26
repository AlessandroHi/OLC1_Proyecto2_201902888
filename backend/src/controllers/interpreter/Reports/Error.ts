export class Error{

    constructor(public tipo: string, public description:string, public linea: number, public columna: number) {  
    }
}

export let ListaErrores:Array<Error> =[];