/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%
/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}  

/* Simbolos del programa */

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
"?"                 return 'TERNARIO';
"="                 return 'IGUAL';

// palabras reservadas
"print"          return 'RPRIN';   // funcion de imprimir
"true"              return 'TRUE';
"false"             return 'FALSE';

// aritmeticos
"++"                return 'INCRE'
"--"                return 'REDUCE'
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVISION';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';

//relacionales
"=="                 return 'IGUALQ';
"!="                 return 'DIFQ';
"<"                 return 'MENORQ';
"<="                 return 'MENORIQ';
">"                 return 'MAYORQ';
">="                 return 'MAYORIQ';

//LOGICOS
"||"                 return 'OR';
"&&"                 return 'AND';
"!"                 return 'NOT';


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

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex

%{
  // importar tipos
  const {Type} = require('./abstract/Return');
  const {TipoAritmetica} = require('./utils/TipoAritmetica');
  const {Primitivo} = require('./expression/Primitivo');
  const {Print} = require('./instruction/Print');
  const {Declarar} = require('./instruction/Declarar');
  const {Acceso} = require('./expression/Acceso');
  const {Aritmetica} = require('./expression/Aritmetica');

%}


// PRECEDENCIA DE OPERADORES
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALQ' 'DIFQ' 'MENORQ' 'MENORIQ' 'MAYORQ' 'MAYORIQ'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%left 'POTENCIA'
%right 'UMENOS '

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
	: DEFPRINT          { $$ = $1; }
  | DECLARAR          { $$ = $1; }
  | CASTEO            { $$ = $1; }
	| error PTCOMA
  {   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;

// GRAMATICA IMPRIMIR 
DEFPRINT
    : RPRIN PARIZQ EXPRESION PARDER PTCOMA  { $$ = new Print(@1.first_line, @1.first_column,$3); }
;


// GRAMATICA DECLARAR
DECLARAR
    : TIPO ID PTCOMA  { $$ = new Declarar($2,$1,null,@1.first_line, @1.first_column ); }
    | TIPO ID IGUAL EXPRESION PTCOMA  { $$ = new Declarar($2,$1,$4,@1.first_line, @1.first_column ); }
;


EXPRESION
  : PRIMITIVO       { $$ = $1; }
  | ACCEDERVAR      { $$ = $1; }
  | ARITMETICA      { $$ = $1; }
  | CASTEO
;

//GRAMATICA CASTEO
CASTEO
     : PARIZQ TIPO PARDER EXPRESION
;

// OPERACION ARITMETICA
ARITMETICA
  : EXPRESION MAS EXPRESION     { $$ = new Aritmetica($1,$3,TipoAritmetica.SUMA,@1.first_line, @1.first_column); }
  | EXPRESION MENOS EXPRESION   { $$ = new Aritmetica($1,$3,TipoAritmetica.RESTA,@1.first_line, @1.first_column); }
  | MENOS EXPRESION %prec UMENOS { $$ = new Aritmetica($2,$2,TipoAritmetica.UMENOS,@1.first_line, @1.first_column); }  
;

// ACCEDER A UNA VARIABLE
ACCEDERVAR
  : ID              { $$ = new Acceso($1,@1.first_line, @1.first_column); }
;

// VALORES 
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