import LenguajeListener from "./generated/LenguajeListener.js";

export class CustomLenguajeListener extends LenguajeListener {

    enterCaracter(ctx) {
        console.log(`Se detectó un carácter: ${ctx.getText()}`);
    }

    enterLetra(ctx) {
        console.log(`Se detectó una letra: ${ctx.getText()}`);
    }

    enterDigito(ctx) {
        console.log(`Se detectó un dígito: ${ctx.getText()}`);
    }

    enterSimbolo(ctx) {
        console.log(`Se detectó un símbolo: ${ctx.getText()}`);
    }

}
