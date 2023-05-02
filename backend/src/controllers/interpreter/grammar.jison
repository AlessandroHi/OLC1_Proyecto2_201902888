/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%
/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}  

// simbolos reservados
";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"."                 return 'PUNTO';
":"                 return 'DOSPUNTOS';
","                 return 'COMA';
"["                 return 'CORIZR';
"]"                 return 'CORDER';
"{"                 return 'LLAVEIZQ';
"}"                 return "LLAVEDER";


// palabras reservadas
"print"             return 'RPRIN';   // funcion de imprimir
"true"              return 'TRUE';
"false"             return 'FALSE';
"for"               return 'RFOR';
"if"                return 'RIF';
"else"              return 'RELSE';
"do"                return 'RDO';
"while"             return 'RWHILE';
"void"              return 'RVOID';
"toLower"           return 'RTOLOWER';
"toUpper"           return 'RTOUPPER';

//Relacionales
"=="                 return 'IGUALQ';
"!="                 return 'DIFERENTEQ';
"<="                 return 'MENORIGUALQUE';
">="                 return 'MAYORIGUALQUE';
"<"                 return 'MENORQUE';
">"                 return 'MAYORQUE';

//LOGICOS
"||"                 return 'OR';
"&&"                 return 'AND';
"!"                  return 'NOT';

//TERNARIO
"?"                 return 'TERNARIO';


//ASIGANACION
"="                 return 'IGUAL';


// aritmeticos
"++"                 return 'INCRE';
"--"                 return 'DECRE';
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVISION';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';

// tipos de variables
"int"               return 'RENTERO';
"string"               return 'RSTRING';
"char"               return 'RCHAR';
"boolean"               return 'RBOOLEAN';
"double"               return 'RDOUBLE';


/* Espacios en blanco */
[ \r\t]+            {}                      // espacio en blanco
\n                  {}                      // salto

[a-zA-Z][a-zA-Z0-9_]*   return 'ID';
[0-9]+("."[0-9]+)\b     return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
\'((\\\')|[^\n\'])*\'	{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'CADENA';}

//\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); 	return 'CADENA'; }


<<EOF>>                 return 'EOF';

.      {  Lexico = new Error("Lexico","No se reconocio el caracter: "+yytext, yylloc.first_line,yylloc.first_column+1); ListaErrores.push(Lexico);}                 
/lex

%{

  //import list errores
  const { ListaErrores} = require ("./Reports/Error.ts");
  const { Error} = require ("./Reports/Error.ts");

  // importar tipos
  const {Type} = require('./abstract/Return');
  const {TipoAritmetica} = require('./utils/TipoAritmetica');
  const {TipoRelacional} = require('./utils/TipoRelacional');
  const {TipoLogica} = require('./utils/TipoLogica')
  const {Primitivo} = require('./expression/Primitivo');
  

  //importar instrucciones y funciones
  const {Print} = require('./instruction/Print');
  const {ToLower} = require('./expression/ToLower')
  const {ToUpper} = require('./expression/ToUpper')
  const {Declarar} = require('./instruction/Declarar');
  const {Acceso} = require('./expression/Acceso');
  const {Aritmetica} = require('./expression/Aritmetica');
  const {Statement} = require('./instruction/Statement');
  const {Funcion} = require('./instruction/Funcion');
  const {Parametros} = require('./expression/Parametros');
  const {LlamadaFuncion} = require('./expression/LlamadaFuncion');
  const {Relacional} = require('./expression/Relacional');
  const {Logica} = require('./expression/Logica');
  const {OperacionesUnarios} = require('./expression/OperacionesUnarios');
  const {Incre} = require('./instruction/Incre')
  const {Decre} = require('./instruction/Decre.ts')
  const {For} = require('./instruction/For');
  const {If} = require('./instruction/If');
  const {DoWhile} = require('./instruction/DoWhile')
  const {While} = require('./instruction/While');
%}


// PRECEDENCIA DE OPERADORES
%left 'TERNARIO' 'DOSPUNTOS'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALQ' 'DIFERENTEQ' 'MENORQUE' 'MENORIGUALQUE' 'MAYORQUE' 'MAYORIGUALQUE'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%nonassoc 'POTENCIA'
%right 'UMENOS '
%right 'INCRE' 'DECRE'

%start INICIO

%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION     { $1.push($2); $$ = $1; }
	| INSTRUCCION                   { $$ = [$1]; }
;

INSTRUCCION
	: DEFPRINT                 { $$ = $1; }
  | DECLARAR PTCOMA          { $$ = $1; }
  | INCREDECRE               { $$ = $1; }
  | GUARDARFUNCION           { $$ = $1; }
  | LLAMADAFUNCION PTCOMA    { $$ = $1; } 
  | FOR                      { $$ = $1; }
  | CONTROLIF                { $$ = $1; }
  | DOWHILE                  { $$ = $1; }
  | WHILE                    { $$ = $1; }
	| error PTCOMA      {  console.error("En la linea "+ this._$.first_column)
    Sintactico = new Error("Sintactico","No se esperaba el caracter ", this._$.first_line,+ this._$.first_column); ListaErrores.push(Sintactico);}
;

// GRAMATICA IMPRIMIR 
DEFPRINT
    : RPRIN PARIZQ EXPRESION PARDER PTCOMA  { $$ = new Print(@1.first_line, @1.first_column,$3); }
;


//GRAMATICA DECLARAR Y ASIGNAR
DECLARAR
    : TIPO ID   { $$ = new Declarar($2,$1,null,@1.first_line, @1.first_column ); }
    | TIPO ID IGUAL EXPRESION   { $$ = new Declarar($2,$1,$4,@1.first_line, @1.first_column ); }
;

// GRAMATICA PARA DECLARAR FUNCIONES
GUARDARFUNCION
  : TIPO ID PARIZQ PARDER STATEMENT  { $$ = new Funcion($1,$2,[],$5,@1.first_line, @1.first_column ); }
  | TIPO ID PARIZQ PARAMETROS PARDER STATEMENT  { $$ = new Funcion($1,$2,$4,$6,@1.first_line, @1.first_column ); }
  | RVOID ID PARIZQ PARDER STATEMENT  { $$ = new Funcion(null,$2,[],$5,@1.first_line, @1.first_column ); }
  | RVOID ID PARIZQ PARAMETROS PARDER STATEMENT  { $$ = new Funcion(null,$2,$4,$6,@1.first_line, @1.first_column ); }
;

//GRAMATICA CICLO DOWHILE
DOWHILE
    :RDO  STATEMENT RWHILE PARIZQ  EXPRESION PARDER PTCOMA  {  $$ = new DoWhile($5, $2, @1.first_line, @1.first_column);    }
;

//GRAMATICA PARA CICLO WHILE
WHILE
    : RWHILE PARIZQ EXPRESION PARDER STATEMENT { $$ = new While($3, $5, @1.first_line, @1.first_column);    }
;

// STATEMENT
STATEMENT
  : LLAVEIZQ INSTRUCCIONES LLAVEDER   { $$ = new Statement($2,@1.first_line, @1.first_column); }
;

// PARAMETROS
PARAMETROS
  : PARAMETROS COMA PARAMETRO   { $1.push($3); $$ = $1; }
  | PARAMETRO                   { $$ = [$1]; }
;

PARAMETRO
  : TIPO ID  {$$ = new Parametros($1,$2,@1.first_line, @1.first_column);}
;
//---------------------
// GRAMATICA PARA CICLO FOR
FOR
  : RFOR PARIZQ DECLARAR PTCOMA EXPRESION PTCOMA OPERACIONESUNARIOS PARDER STATEMENT  { $$ = new For($3,$5,$7,$9,@1.first_line, @1.first_column); }
;

//GRAMATICA PARA SENTENCIA IF
CONTROLIF 
  : RIF PARIZQ EXPRESION PARDER STATEMENT CONTROLELSE { $$ = new If($3,$5,$6,@1.first_line, @1.first_column); }
;

CONTROLELSE
  : RELSE STATEMENT { $$ = $2; }
  | RELSE CONTROLIF { $$ = $2; }
  | { $$ = null; }
;
//----------------------------

// INCREMENTO Y DECREMENTO COMO INSTRUCCION
INCREDECRE
    : ID INCRE PTCOMA { $$= new Incre($1,@2.first_line,@2.first_column); }
    | ID DECRE PTCOMA { $$= new Decre($1,@2.first_line,@2.first_column); }
;

//RETORNO DE EXPRESIONES
EXPRESION
  : PRIMITIVO       { $$ = $1; }
  | ACCEDERVAR      { $$ = $1; }
  | ARITMETICA      { $$ = $1; }
  | RELACIONALES  { $$ = $1; }
  | LOGICOS      { $$ = $1; }
  | OPERACIONESUNARIOS { $$ = $1; }
  | TOLOWER { $$ = $1; }
  | TOUPPER { $$ = $1; }
;

// llamada a funciones
LLAMADAFUNCION
  : ID PARIZQ PARDER { $$ = new LlamadaFuncion($1,[],@1.first_line, @1.first_column); }
  | ID PARIZQ ARGUMENTOS PARDER { $$ = new LlamadaFuncion($1,$3,@1.first_line, @1.first_column); }
;

// argumentos
ARGUMENTOS
  : ARGUMENTOS COMA EXPRESION { $1.push($3); $$ = $1;}
  | EXPRESION { $$ = [$1];}
;

//GRAMATICA PARA TOLOWER
TOLOWER
      : RTOLOWER PARIZQ EXPRESION PARDER {$$ = new ToLower($3,@1.first_line, @1.first_column);}
;

//GRAMATICA PARA TOUPPER
TOUPPER
      : RTOUPPER PARIZQ EXPRESION PARDER {$$ = new ToUpper($3,@1.first_line, @1.first_column);}
;

// OPERACION ARITMETICA
ARITMETICA
  : EXPRESION MAS EXPRESION     { $$ = new Aritmetica($1,$3,TipoAritmetica.SUMA,@1.first_line, @1.first_column); }
  | EXPRESION MENOS EXPRESION   { $$ = new Aritmetica($1,$3,TipoAritmetica.RESTA,@1.first_line, @1.first_column); }
  | EXPRESION POR EXPRESION   { $$ = new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION,@1.first_line, @1.first_column); }
  | EXPRESION DIVISION EXPRESION   { $$ = new Aritmetica($1,$3,TipoAritmetica.DIVISION,@1.first_line, @1.first_column); }
  | EXPRESION POTENCIA EXPRESION   { $$ = new Aritmetica($1,$3,TipoAritmetica.POTENCIA,@1.first_line, @1.first_column); }
  | EXPRESION MODULO EXPRESION   { $$ = new Aritmetica($1,$3,TipoAritmetica.MODULO,@1.first_line, @1.first_column); }
  | MENOS EXPRESION %prec UMENOS { $$ = new Aritmetica($2,$2,TipoAritmetica.UMENOS,@1.first_line, @1.first_column); } 
;

// GRAMATICA RELACIONALES
RELACIONALES
  : EXPRESION IGUALQ EXPRESION     { $$ = new Relacional($1,$3,TipoRelacional.IGUALQ,@1.first_line, @1.first_column); } 
  |EXPRESION MENORQUE EXPRESION     { $$ = new Relacional($1,$3,TipoRelacional.MENORQUE,@1.first_line, @1.first_column); }
  | EXPRESION MAYORQUE EXPRESION     { $$ = new Relacional($1,$3,TipoRelacional.MAYORQUE,@1.first_line, @1.first_column); }
  | EXPRESION DIFERENTEQ EXPRESION     { $$ = new Relacional($1,$3,TipoRelacional.DIFERENTEQ,@1.first_line, @1.first_column); }
  | EXPRESION MAYORIGUALQUE EXPRESION     { $$ = new Relacional($1,$3,TipoRelacional.MAYORIGUALQUE,@1.first_line, @1.first_column); }
  | EXPRESION MENORIGUALQUE EXPRESION     { $$ = new Relacional($1,$3,TipoRelacional.MENORIGUALQUE,@1.first_line, @1.first_column); }

;

//GRAMATICA LOGICOS
LOGICOS
    : EXPRESION OR EXPRESION  { $$ = new Logica($1,$3,TipoLogica.OR,@1.first_line, @1.first_column); }  
    | EXPRESION AND EXPRESION  { $$ = new Logica($1,$3,TipoLogica.AND,@1.first_line, @1.first_column); } 
    | NOT EXPRESION  { $$ = new Logica($2,null,TipoLogica.NOT,@1.first_line, @1.first_column); }  
; 

//GRAMATICA INCREMENTO DECREMENTO
OPERACIONESUNARIOS
  :ID INCRE  { $$ = new OperacionesUnarios($1,TipoAritmetica.INCREMENTO,@1.first_line, @1.first_column); }
  | ID DECRE { $$ = new OperacionesUnarios($1,TipoAritmetica.DECREMENTO,@1.first_line, @1.first_column); }
;

// ACCEDER A UNA VARIABLE
ACCEDERVAR
  : ID              { $$ = new Acceso($1,@1.first_line, @1.first_column); }
;

PRIMITIVO
  : ENTERO          { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.INT); }
  | DECIMAL         { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.DOUBLE); }
  | CADENA          { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.STRING);}
  | CARACTER        { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.CHAR); }
  | TRUE            { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
  | FALSE           { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
;


// GRAMATICA TIPO
TIPO
  : RENTERO         { $$ = Type.INT; }
  | RDOUBLE         { $$ = Type.DOUBLE; }
  | RSTRING         { $$ = Type.STRING; }
  | RCHAR           { $$ = Type.CHAR; }
  | RBOOLEAN        { $$ = Type.BOOLEAN; }
;