import LenguajeLexer from "./generated/LenguajeLexer.js";
import LenguajeParser from "./generated/LenguajeParser.js";
import { CustomLenguajeVisitor } from "./CustomLenguajeVisitor.js";
// import { CustomLenguajeListener } from "./CustomLenguajeListener.js";

import antlr4, { CharStreams, CommonTokenStream, ParseTreeWalker } from "antlr4";
import readline from 'readline';
import fs from 'fs';

async function main() {
    let input;

    // Leer desde archivo input.txt o desde consola si no existe
    try {
        input = fs.readFileSync('input.txt', 'utf8');
    } catch (err) {
        input = await leerCadena();
        console.log(input);
    }

    // Procesar entrada
    const inputStream = CharStreams.fromString(input);
    const lexer = new LenguajeLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new LenguajeParser(tokenStream);

    parser.buildParseTrees = true;
    const tree = parser.programa();

    // Verificar errores de sintaxis
    if (parser._syntaxErrors > 0) {
        console.error("\n❌ Se encontraron errores de sintaxis.");
    } else {
        console.log("\n✅ Entrada válida.");

        // Árbol de derivación
        const cadena_tree = tree.toStringTree(parser.ruleNames);
        console.log("\n🌳 Árbol de derivación (texto):\n" + cadena_tree);

        // Visitor personalizado
        const visitor = new CustomLenguajeVisitor();
        const traduccion = visitor.visit(tree); // genera el JS y lo guarda

        // Información del visitor
        if (visitor.resultado?.info?.length > 0) {
            console.log("\nℹ️ Información del Visitor:");
            visitor.resultado.info.forEach(info => console.log("• " + info));
        }

        // Tabla de tokens
        console.log("\n📋 Tabla de lexemas-tokens:");
        const symbolicNames = LenguajeLexer.symbolicNames;
        tokenStream.fill();
        tokenStream.tokens.forEach(token => {
            const tipo = symbolicNames[token.type] || 'DESCONOCIDO';
            if (tipo !== 'EOF') {
                console.log(`Token: ${tipo.padEnd(15)} | Lexema: '${token.text}' | Línea: ${token.line}`);
            }
        });

        // Código traducido a JavaScript
        if (visitor.resultado?.traduccionJS) {
            console.log("\n💻 Código traducido a JavaScript:");
            console.log(visitor.resultado.traduccionJS);

            // (Opcional) Guardar en archivo
            fs.writeFileSync('output.js', visitor.resultado.traduccionJS, 'utf8');
            console.log("\n📝 Traducción guardada en output.js");
        }
    }
}

function leerCadena() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question("Ingrese una cadena: ", (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

main();


