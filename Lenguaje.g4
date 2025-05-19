grammar Lenguaje;

programa: instrucciones ;
instrucciones: instruccion+ ;
instruccion: bucle ;
bucle: DO LLAVE_ABRE sentencia J WHILE PARENTESIS_ABRE condicion PARENTESIS_CIERRA PUNTO_Y_COMA ;
sentencia: (salida | terminar)+ ;
salida: PUTS PARENTESIS_ABRE CADENA PARENTESIS_CIERRA PUNTO_Y_COMA ;
terminar: BREAK PUNTO_Y_COMA ;
condicion: '0' | '1' ;

DO: 'do';
PUTS: 'puts';
BREAK: 'break';
J: 'J';
WHILE: 'while';
PARENTESIS_ABRE: '(';
PARENTESIS_CIERRA: ')';
LLAVE_ABRE: '{';
LLAVE_CIERRA: '}';
PUNTO_Y_COMA: ';';

CADENA: '"' (~["\r\n])* '"' ;

WS: [ \t\r\n]+ -> skip ;
