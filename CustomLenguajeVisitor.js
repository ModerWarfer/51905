// CustomLenguajeVisitor.js

import LenguajeVisitor from "./generated/LenguajeVisitor.js";

export class CustomLenguajeVisitor extends LenguajeVisitor {
  constructor() {
    super();
    this.resultado = {
      valido: true,
      errores: [],
      info: [],
      traduccionJS: ""
    };
  }

  visitPrograma(ctx) {
    const instrucciones = this.visit(ctx.instrucciones());
    this.resultado.traduccionJS = instrucciones;
    return this.resultado.traduccionJS;
  }


  visitInstruccion(ctx) {
    return this.visit(ctx.seleccion());
  }

  visitSeleccion(ctx) {
    const expresion = this.visit(ctx.expresion());
    const casos = ctx.caso().map(c => this.visit(c)).join('\n');
    const defecto = ctx.caso_defecto() ? this.visit(ctx.caso_defecto()) : '';
    return `switch (${expresion}) {\n${casos}${defecto}}`;
  }

  visitCaso(ctx) {
    const valor = this.visit(ctx.constante());
    const cuerpo = this.visit(ctx.sentencia());
    return `  case ${valor}:\n${this._indent(cuerpo)}\n    break;\n`;
  }

  visitCaso_defecto(ctx) {
    const cuerpo = this.visit(ctx.sentencia());
    return `  default:\n${this._indent(cuerpo)}\n    break;\n`;
  }

  visitSentencia(ctx) {
    return ctx.children.map(child => this.visit(child)).join('\n');
  }

  visitSalida(ctx) {
    const texto = this.visit(ctx.cadena());
    return `    console.log(${texto});`;
  }

  visitTermina(ctx) {
    return `    return;`;
  }

  visitExpresion(ctx) {
    return this.visit(ctx.constante());
  }

  visitConstante(ctx) {
    if (ctx.cadena()) return this.visit(ctx.cadena());
    if (ctx.numero()) return this.visit(ctx.numero());
    return "undefined";
  }

  visitCadena(ctx) {
    return ctx.getText();
  }

  visitNumero(ctx) {
    return ctx.getText();
  }

  _indent(texto) {
    return texto
      .split('\n')
      .map(line => '    ' + line)
      .join('\n');
  }

  visitChildren(ctx) {
    try {
      return super.visitChildren(ctx);
    } catch (err) {
      this.resultado.valido = false;
      this.resultado.errores.push({
        linea: ctx.start.line,
        mensaje: err.message
      });
    }
  }
}
